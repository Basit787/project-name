import { Injectable, Post } from '@nestjs/common';
import { CreatePost } from './dto/create-post.dto';
import { Posts } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly posts: Posts[] = [];

  getHello(): Posts[] {
    return this.posts;
  }

  getSingleId(id: string): Posts[] | string {
    const getSinglePoste = this.posts.filter((post) => post.id === id);
    if (!getSinglePoste.length) return 'No post found';
    return getSinglePoste;
  }

  postHello(data: CreatePost): Posts[] {
    const newPost: Posts = { id: `${this.posts.length + 1}`, ...data };
    this.posts.push(newPost);
    return this.posts;
  }

  deleteHello(id: string): Posts[] | string {
    const deletePost = this.posts.filter((post) => post.id !== id);
    if (!deletePost.length) return 'No posts found';
    return deletePost;
  }

  putHello(id: string, postData: CreatePost) {
    const updateId = this.posts.findIndex((post) => post.id === id);
    if (updateId === -1) return 'No post found';
    this.posts[updateId] = { id, ...postData };
    return `Updated post with id ${id} with data ${JSON.stringify(this.posts[updateId])}`;
  }
}
