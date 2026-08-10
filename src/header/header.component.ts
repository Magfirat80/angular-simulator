import { Component, inject } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../services/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../features/auth/interfaces/IUser';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterModule,
    FormsModule,
    ToggleSwitchModule,
    FontAwesomeModule,
    CommonModule,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);

  readonly config: IAppConfig = inject(APP_CONFIG);

  currentUser$: Observable<IUser | null> = this.authService.currentUser$;

  currentWidget: 'counter' | 'date' = 'counter';
  counter = 0;
  currentDateAndTime: string = new Date().toLocaleString();
  lastLogin: Date | null = this.authService.getLastLogin();

  navList: INavigation[] = [
    { id: 1, navItem: 'Главная', path: '/home' },
    { id: 2, navItem: 'Пользователи', path: '/users' },
    { id: 3, navItem: 'Посты', path: '/posts' },
  ];

  constructor() {
    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();
    }, 1000);
  }

  increaseCount(): void {
    this.counter++;
  }

  reduceCount(): void {
    this.counter--;
  }

  switchWidget(widget: 'counter' | 'date'): void {
    this.currentWidget = widget;
  }

  logout(): void {
    this.authService.logout();
  }

}