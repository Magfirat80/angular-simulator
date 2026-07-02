import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPost } from './interfaces/IPost';
import { catchError, EMPTY, finalize, Observable, tap, BehaviorSubject } from 'rxjs';
import { IPostsResponse } from './interfaces/IPostsResponse';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  loadPosts(limit: number, skip: number): void {
    this.isLoadingSubject.next(true);

    this.postApiService.getPosts(limit, skip).pipe(
      tap((response: IPostsResponse) => {
        this.postsSubject.next(response.posts);
        this.totalRecordsSubject.next(response.total);
      }),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return EMPTY;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    ).subscribe()
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.updatePost(id, post).pipe(
      tap((updatedPost: IPost) => {
        const updatedPosts = this.postsSubject.value.map(item =>
          item.id === updatedPost.id ? { ...item, ...updatedPost } : item
        );
        this.postsSubject.next(updatedPosts);
        this.messageService.showSuccess('Пост обновлен');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка обновления');
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
        this.messageService.showSuccess('Пост успешно удален');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка удаления');
        return EMPTY;
      })
    );
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.createPost(post).pipe(
      tap(() => {
        this.totalRecordsSubject.next(this.totalRecordsSubject.value + 1);
        this.messageService.showSuccess('Пост добавлен');
      }),
      catchError((err) => {
        this.messageService.showError('Ошибка создания');
        throw err;
      })
    )
  }

  getCurrentPosts(): IPost[] {
    return this.postsSubject.value;
  }

  getTotalRecords(): number {
  return this.totalRecordsSubject.value;
  }

}