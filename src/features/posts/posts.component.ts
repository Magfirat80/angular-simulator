import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { PostApiService } from '../post-api.service';
import { IPost } from '../interfaces/IPost';
import { TableModule, TablePageEvent } from 'primeng/table';
import { MessageService } from '../../services/message.service';
import { IPostsResponse } from '../interfaces/IPostsResponse';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, CommonModule, ContextMenuModule, SkeletonModule, InputTextModule, ButtonModule, FormsModule, DialogModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  posts: IPost[] = [];

  private router: Router = inject(Router);

  menuItems: MenuItem[] = [];
  selectedPost: IPost | null = null;
  loading: boolean = true;

  rows: number = 10;
  first: number = 0;
  totalRecords: number = 0;

  editDialogVisible: boolean = false;
  editablePost: IPost | null = null;
  editableTags: string = '';

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
        command: () => this.editPost()
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
    this.loading = true;

    this.postApiService.getPosts(this.rows, this.first).pipe(
      tap((data: IPostsResponse) => {
        this.posts = data.posts;
        this.totalRecords = data.total;
      }),
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return EMPTY;
      }),
      finalize(() => this.loading = false)
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
  
  editPost(): void {
    if (!this.selectedPost) return;

    this.editablePost = { ...this.selectedPost };
    this.editableTags = this.editablePost.tags.join(', ');
    this.editDialogVisible = true;
  }

  savePost(): void {
    if (!this.editablePost) return;

    const payload: Partial<IPost> = {
      title: this.editablePost.title,
      tags: this.editableTags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      views: this.editablePost.views
    };

    this.postApiService.updatePost(this.editablePost.id, payload).pipe(
      tap(updatedPost => {
        this.posts = this.posts.map(post =>
          post.id === updatedPost.id ? { ...post, ...payload } : post
        );

        this.posts = [...this.posts];
        this.selectedPost = null;
        this.editablePost = null;
        this.editableTags = '';
        this.editDialogVisible = false;

        this.messageService.showSuccess('Пост обновлён локально. DummyJSON не сохраняет изменения на сервере.');
      }),
      catchError(() => {
        this.messageService.showError('Не удалось обновить пост');
        return EMPTY;
      })
    ).subscribe();
  }

  deletePost(): void {
    if (!this.selectedPost) return;

    const postId: number = this.selectedPost.id;

    this.postApiService.deletePost(postId).pipe(
      tap(() => {
        this.posts = this.posts.filter(
          post => post.id !== postId
        );

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