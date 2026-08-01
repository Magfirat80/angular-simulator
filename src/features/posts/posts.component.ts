import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, take, Observable, switchMap, tap, finalize } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostService } from '../post.service';
import { AsyncPipe } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, CommonModule, ContextMenuModule, SkeletonModule, ButtonModule, DynamicDialogModule, AsyncPipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  
  private postService: PostService = inject(PostService);
  private dialogService: DialogService = inject(DialogService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  
  posts$: Observable<IPost[]> = this.postService.posts$;
  totalRecords$: Observable<number> = this.postService.totalRecords$;

  isLoading: boolean = false;

  rows: number = 10;
  first: number = 0;
  selectedPost: IPost | null = null;

  menuItems: MenuItem[] = [
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
  
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;

    this.postService.loadPosts(this.rows, this.first).pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return EMPTY;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  onPageChange(event: TablePageEvent): void {
    this.first = event.first;
    this.rows = event.rows;
    this.postService.loadPosts(this.rows, this.first);
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
      switchMap((formData: Partial<IPost> | undefined) => {
        if (!formData) return EMPTY;
        this.messageService.showSuccess('Пост обновлен');
        return this.postService.updatePost(post.id, formData);
      }),
      catchError(() => {
        this.messageService.showError('Ошибка обновления');
        return EMPTY;
      })
    ).subscribe();
  }

  deletePost(): void {
    if (!this.selectedPost) return;

    const postId: number = this.selectedPost.id;

    this.postService.deletePost(postId).pipe(
      tap(() => {
        this.selectedPost = null;
        this.messageService.showSuccess('Пост успешно удален');

        const currentPosts: IPost[] = this.postService.getCurrentPosts();

        if (currentPosts.length === 0 && this.first > 0) {
          this.first = Math.max(0, this.first - this.rows);
          this.postService.loadPosts(this.rows, this.first);
        }
      }),
      catchError(() => {
        this.messageService.showError('Ошибка удаления');
        return EMPTY;
      })
    ).subscribe();
  }

  openCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

  get pageReport(): string {
    const posts: IPost[] = this.postService.getCurrentPosts();
    const total: number = this.postService.getTotalRecords();
    const first: number = this.first + 1;
    const last: number = this.first + posts.length;

    if (total === 0) {
      return '0 - 0 из 0';
    }

    return `${ first } - ${ last } из ${ total }`;
  }

}