import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareHash, createHash } from 'src/helpers/utils';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(data: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOneBy({ email: data.email });

    if (!user) throw new NotFoundException({ message: 'User not found' });
    if (!(await compareHash(data.password, user.password))) {
      throw new UnauthorizedException({ error: "Password didn't match" });
    }
    const payload = { id: user.id, username: user.name, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...data } = createUserDto;
      const hashPassword = await createHash(password);
      const user = this.usersRepository.create({
        password: hashPassword,
        ...data,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException({ message: 'Error', error });
    }
  }
}
