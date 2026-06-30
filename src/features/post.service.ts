import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import type { IPost } from './interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);

  getPosts(limit: number, skip: number) {
    return this.postApiService.getPosts(limit, skip);
  }

  getPost(id: number) {
    return this.postApiService.getPostById(id);
  }

  createPost(post: Partial<IPost>) {
    return this.postApiService.createPost(post);
  }

  updatePost(id: number, post: Partial<IPost>) {
    return this.postApiService.updatePost(id, post);
  }

  deletePost(id: number) {
    return this.postApiService.deletePost(id);
  }

}