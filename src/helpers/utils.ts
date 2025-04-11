import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const createHash = async (password: string): Promise<string> => {
  try {
    const saltRound = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    throw new BadRequestException({ message: 'error in hashing', error });
  }
};

export const compareHash = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    throw new BadRequestException({
      message: 'error in comparing hashing',
      error,
    });
  }
};
