import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { PostService } from '../post.service';
import { MessageService } from '../../services/message.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, TranslatePipe],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);
  private messageService: MessageService = inject(MessageService);
  private translateService: TranslateService = inject(TranslateService);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: ['', Validators.required],
    body: ['', Validators.required],

    reactions: this.fb.group({
      likes: ['', [Validators.required]],
      dislikes: ['', [Validators.required]],
    }),
    views: ['', [Validators.required]],
    userId: ['', [Validators.required]]
  });

  createPost(): void {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).pipe(
        tap(() => {
          this.router.navigate(['/posts']);
          this.messageService.showSuccess(
            this.translateService.instant('POST_CREATE.SUCCESS')
          );
        }),
        catchError(() => {
          this.messageService.showError(
            this.translateService.instant('POST_CREATE.ERROR')
          );
          return EMPTY;
        })
      ).subscribe();
    }
  }

  backToPosts(): void {
    this.router.navigate(['/posts']);
  }

}