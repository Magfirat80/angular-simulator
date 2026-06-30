import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { PostApiService } from '../post-api.service';
import { MessageService } from '../../services/message.service';
import { IPost } from '../interfaces/IPost';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly postApiService: PostApiService = inject(PostApiService);
  private readonly messageService: MessageService = inject(MessageService);

  readonly postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  createPost(): void {
    const formValue = this.postForm.getRawValue();

    const tags: string[] = (formValue.tags ?? '')
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    const payload: Partial<IPost> = {
      ...formValue,
      tags,
      reactions: {
        likes: 0,
        dislikes: 0
      }
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