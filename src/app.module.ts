import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/app.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import 'dotenv/config';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST ?? '127.0.0.1',
      port: Number(DB_PORT) ?? '',
      username: DB_USER ?? '',
      password: DB_PASS ?? '',
      database: DB_NAME ?? '',
      entities: [User],
      autoLoadEntities: true,
      synchronize: false,
    }),
    PostsModule,
    UsersModule,
  ],
})
export class AppModule {}
