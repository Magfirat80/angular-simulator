import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './interfaces/IPost';
import { catchError, EMPTY, Observable, tap, BehaviorSubject } from 'rxjs';
import { IPostsResponse } from './interfaces/IPostsResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);

  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();

  loadPosts(limit: number, skip: number): Observable<IPostsResponse> {
    this.postApiService.getPosts(limit, skip).pipe(
      tap((response: IPostsResponse) => {
        this.postsSubject.next(response.posts);
        this.totalRecordsSubject.next(response.total);
      }),
      catchError(() => {
        return EMPTY;
      }),
    ).subscribe();
    return this.postApiService.getPosts(limit, skip);
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.updatePost(id, post).pipe(
      tap((updatedPost: IPost) => {
        const updatedPosts: IPost[] = this.postsSubject.value.map(item =>
          item.id === updatedPost.id ? { ...item, ...updatedPost } : item
        );
        this.postsSubject.next(updatedPosts);
      }),
      catchError(() => {
        return EMPTY;
      })
    );
  }

  deletePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const updatedPosts: IPost[] = this.postsSubject.value.filter((post: IPost) => post.id !== id);
        this.postsSubject.next(updatedPosts);
        this.totalRecordsSubject.next(Math.max(0, this.totalRecordsSubject.value - 1));
      }),
      catchError(() => {
        return EMPTY;
      })
    );
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.createPost(post).pipe(
      tap(() => {
        this.totalRecordsSubject.next(this.totalRecordsSubject.value + 1);
      }),
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  getCurrentPosts(): IPost[] {
    return this.postsSubject.value;
  }

  getTotalRecords(): number {
    return this.totalRecordsSubject.value;
  }

}