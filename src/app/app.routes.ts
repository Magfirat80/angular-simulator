import { Routes } from '@angular/router';
import { postResolver } from '../features/post.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('../features/posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: 'posts/create',
    loadComponent:() => import('../features/post-create/post-create.component').then(m => m.PostCreateComponent)
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('../features/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    resolve: { post: postResolver }
  },
  {
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];