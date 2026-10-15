import { Routes } from '@angular/router';
import { postResolver } from './features/posts/routing/post.resolver';
import { authGuard } from './features/auth/guards/auth.guard';
import { adminGuard } from './features/auth/guards/admin.guard';
import { ParentComponent } from '../homework-28/parent/parent.component';
import { ChangeDetectionComponent } from '../homework-28/change-detection/change-detection.component';
import { ChangeDetectionOnPushComponent } from '../homework-28/change-detection-on-push/change-detection-on-push.component';
import { productResolver } from './features/products/routing/product.resolver';

export const routes: Routes = [
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/product-list-page/product-list-page.component').then(
        (m) => m.ProductListPageComponent,
      ),
  },
  {
    path: 'products/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/product-detail-page/product-detail-page.component').then(
        (m) => m.ProductDetailPageComponent,
      ),
    resolve: { product: productResolver },
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/products/pages/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  {
    path: 'parent',
    component: ParentComponent,
  },
  {
    path: 'changeDetection',
    component: ChangeDetectionComponent,
  },
  {
    path: 'changeDetectionOnPush',
    component: ChangeDetectionOnPushComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/users/pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent,
      ),
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/pages/post-create/post-create.component').then(
        (m) => m.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/pages/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent,
      ),
    resolve: { post: postResolver },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
