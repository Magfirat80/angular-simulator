import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import type { IPost } from './interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private api: PostApiService = inject(PostApiService);

  getPosts(limit: number, skip: number) {
    return this.api.getPosts(limit, skip);
  }

  getPost(id: number) {
    return this.api.getPostById(id);
  }

  createPost(post: Partial<IPost>) {
    return this.api.createPost(post);
  }

  updatePost(id: number, post: Partial<IPost>) {
    return this.api.updatePost(id, post);
  }

  deletePost(id: number) {
    return this.api.deletePost(id);
  }

}