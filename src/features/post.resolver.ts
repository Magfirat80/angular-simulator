import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { MessageService } from '../services/message.service';
import { IPost } from './interfaces/IPost';
import { PostApiService } from './post-api.service';
import { TranslateService } from '@ngx-translate/core';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {
  const postApiService: PostApiService = inject(PostApiService);
  const messageService: MessageService = inject(MessageService);
  const router: Router = inject(Router);
  const translateService: TranslateService = inject(TranslateService);

  const id = Number(route.paramMap.get('id'));

  if (!id) {
    messageService.showError(translateService.instant('POSTS.INVALID_ID'));
    router.navigate(['/posts']);
    return EMPTY;
  }
  
  return postApiService.getPostById(id).pipe(
    catchError(() => {
      messageService.showError(translateService.instant('POSTS.POST_NOT_FOUND'));
      router.navigate(['/posts']);
      return EMPTY;
    }),
  );

};