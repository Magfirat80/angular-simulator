import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PostApiService } from '../post-api.service';
import { MessageService } from '../../services/message.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { IPost } from '../interfaces/IPost';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private router: Router = inject(Router);
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  post = {
    title: '',
    body: '',
    tags: '',
    views: 0,
    userId: 1,
    reactions: {
      likes: 0,
      dislikes: 0
    }
  };

  createPost(): void {
    const payload: Partial<IPost> = {
      title: this.post.title,
      body: this.post.body,
      tags: this.post.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      views: this.post.views,
      userId: this.post.userId,
      reactions: this.post.reactions
    };

    this.postApiService.createPost(payload).pipe(
      tap(() => {
        this.messageService.showSuccess('Пост успешно создан');
        this.router.navigate(['/posts']);
      }),
      catchError(() => {
        this.messageService.showError('Не удалоcь создать пост');
        return EMPTY;
      })
    ).subscribe();
  }

  backToPosts(): void {
    this.router.navigate(['/posts'])
  }

}