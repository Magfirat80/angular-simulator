import { Routes } from '@angular/router';
import { postResolver } from '../features/post.resolver';
import { authGuard } from '../features/auth/guards/auth.guard';
import { adminGuard } from '../features/auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../features/auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('../features/posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent:() => import('../features/post-create/post-create.component').then(m => m.PostCreateComponent)
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('../features/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    resolve: { post: postResolver }
  },
  {
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];