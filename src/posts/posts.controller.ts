import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { Posts } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getHello(): Promise<Posts[]> {
    return this.postsService.getHello();
  }

  @Get(':id')
  getCunstomId(@Param('id') id: string): Posts[] | string {
    return this.postsService.getSingleId(id);
  }

  @Post()
  postRequest(@Body() createPost: CreatePost): Posts[] {
    return this.postsService.postHello(createPost);
  }

  @Delete(':id')
  deleteHello(@Param('id') id: string): Posts[] | string {
    return this.postsService.deleteHello(id);
  }

  @Put(':id')
  customPut(
    @Param('id') id: string,
    @Body() createPost: CreatePost,
  ): Posts[] | string {
    return this.postsService.putHello(id, createPost);
  }
}
