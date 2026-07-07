import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { MessageService } from '../services/message.service';
import { IPost } from './interfaces/IPost';
import { PostApiService } from './post-api.service';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {
  const postApiService: PostApiService = inject(PostApiService);
  const messageService: MessageService = inject(MessageService);
  const router: Router = inject(Router);

  const id: number = Number(route.paramMap.get('id'));

  if (!id) {
    messageService.showError('Некорректный id поста');
    router.navigate(['/posts']);
    return EMPTY;
  }
  
  return postApiService.getPostById(id).pipe(
    catchError(() => {
      messageService.showError('Не удалось загрузить пост');
      router.navigate(['/posts']);
      return EMPTY;
    }),
  );

};