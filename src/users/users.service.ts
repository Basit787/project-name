import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException({ message: 'Eror', error });
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const data = await this.usersRepository.find();
      console.log(data);
      return data;
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const data = await this.usersRepository.findOneBy({ id });
      if (data === null)
        throw new NotFoundException({ error: 'User not found' });
      return data;
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const data = await this.usersRepository.delete(id);
      if (data.affected === 0)
        throw new NotFoundException({ message: 'user not found' });
      return { message: `user Deleted successfully with id ${id}` };
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }
}
