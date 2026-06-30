import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, finalize, switchMap, take, tap } from 'rxjs';
import { PostApiService } from '../post-api.service';
import { IPost } from '../interfaces/IPost';
import { TableModule, TablePageEvent } from 'primeng/table';
import { MessageService } from '../../services/message.service';
import { IPostsResponse } from '../interfaces/IPostsResponse';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, CommonModule, ContextMenuModule, SkeletonModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private dialogService: DialogService = inject(DialogService);
  private router: Router = inject(Router);

  posts: IPost[] = [];
  menuItems: MenuItem[] = [];
  selectedPost: IPost | null = null;
  isLoading: boolean = true;

  rows: number = 10;
  first: number = 0;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Просмотр',
        icon: 'pi pi-eye',
        command: () => this.openPost()
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => this.editPost(this.selectedPost)
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => this.deletePost()
      }
    ];

    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;

    this.postApiService.getPosts(this.rows, this.first).pipe(
      tap((data: IPostsResponse) => {
        this.posts = data.posts;
        this.totalRecords = data.total;
      }),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return EMPTY;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadPosts();
  }

  openPost(): void {
    if (!this.selectedPost) return;
    this.router.navigate(['/posts', this.selectedPost.id]);
  }

  onRowDoubleClick(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

  editPost(post: IPost | null): void {
    if (!post) return;
    
    const ref: DynamicDialogRef<PostEditDialogComponent> | null = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактирование поста',
      width: '600px',
      modal: true,
      data: post
    });

    ref?.onClose.pipe(
      take(1),
      switchMap((updatedPost: IPost | undefined) => {
        if (!updatedPost) {
          return EMPTY;
        }
        
        return this.postApiService.updatePost(updatedPost.id, updatedPost);
      }),
      tap(updatedPost => {
        this.posts = this.posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
        this.posts = [...this.posts];
        this.messageService.showSuccess('Пост обновлён');
      }),
      catchError(() => {
        this.messageService.showError('Ошибка обновления поста');
        return EMPTY;
      })
    ).subscribe();
  }

  deletePost(): void {
    if (!this.selectedPost) return;

    const postId: number = this.selectedPost.id;

    this.postApiService.deletePost(postId).pipe(
      tap(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.posts = [...this.posts];
        this.totalRecords = Math.max(0, this.totalRecords - 1);
        this.selectedPost = null;
        this.messageService.showSuccess('Пост удалён');

        if (this.posts.length === 0 && this.first > 0) {
          this.first = Math.max(0, this.first - this.rows);
          this.loadPosts();
        }
      }),
      catchError(() => {
        this.messageService.showError('Не удалось удалить пост');
        return EMPTY;
      })
    ).subscribe();
  }

  openCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

}