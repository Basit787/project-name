import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(2, { message: 'Min 2 char are required' })
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Min 8 digits required' })
  password: string;

  @IsOptional()
  role: string;
}
