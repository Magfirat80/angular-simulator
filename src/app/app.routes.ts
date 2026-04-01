import { Routes } from '@angular/router';
import { UsersPageComponent } from '../users-page/users-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { HomePageComponent } from '../home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent },
];