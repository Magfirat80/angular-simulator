import { Component } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  currentWidget:  'counter' | 'date' = 'counter';
  counter: number = 0;
  currentDateAndTime: string = new Date().toLocaleString();

  navList: INavigation[] = [
    {
      id: 1,
      navItem: 'Главная',
      path: '/'
    },
    {
      id: 2,
      navItem: 'Пользователи',
      path: '/users'
    }
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
