import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const data = await this.usersRepository.find();
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
    try {
      const data = await this.usersRepository.update(
        { id },
        { ...updateUserDto },
      );
      if (data.affected === 0)
        throw new BadRequestException({ message: 'Failed to update user' });
      return {
        message: `User updated successfully with id ${id}`,
        data: updateUserDto,
      };
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }

  async remove(id: number) {
    try {
      const getUser = await this.usersRepository.findOneBy({ id });
      const data = await this.usersRepository.delete(id);
      if (data.affected === 0)
        throw new NotFoundException({ message: 'Failed to delete user' });
      return {
        message: `user Deleted successfully with id ${id}`,
        data: getUser,
      };
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }
}
