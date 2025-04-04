import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
