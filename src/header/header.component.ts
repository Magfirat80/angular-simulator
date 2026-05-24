import { Component, inject } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterModule } from '@angular/router';
import { MessageService } from '../services/message.service';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../services/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';

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

  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);

  companyName: string = 'румтибет';
  currentWidget: 'counter' | 'date' = 'counter';
  counter: number = 0;
  currentDateAndTime: string = new Date().toLocaleString();

  navList: INavigation[] = [
    { id: 1, navItem: 'Главная', path: '/' },
    { id: 2, navItem: 'Пользователи', path: '/users' },
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

}