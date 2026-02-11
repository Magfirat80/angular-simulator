import { Component, input } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import './collection'
import { IService } from '../interfaces/IService';
import { FormsModule } from '@angular/forms';
import { IParticipantsCount } from '/0_ang/pr/angular-simulator/src/interfaces/IParticipantsCount';
import { ITourLocation } from '../interfaces/ITourLocation';
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет';
  selectedTour: string = '';
  selectedGroup: string = '';
  selectedDate: string = '';
  selectedServiceId: number = 2;
  currentDateAndTime: string = new Date().toLocaleString();
  clickCounter: number = 0;
  switchFlag: boolean = true;
  liveInput: string = '';
  isLoading: boolean = true;

  locations: ITourLocation[] = [
    {
      id: 1,
      tourLocation: 'Восхождение на Эльбрус'
    },
    {
      id: 2,
      tourLocation: 'Кольцо Эльбруса'
    },
    {
      id: 3,
      tourLocation: 'Поход к Белухе'
    },
    {
      id: 4,
      tourLocation: 'Шавлинские озёра'
    },
    {
      id: 5,
      tourLocation: 'Уральский Барс'
    },
    {
      id: 6,
      tourLocation: 'Треккинг в Хибинах'
    },
    {
      id: 7,
      tourLocation: 'Долина вулканов'
    },
  ];

  groups: IParticipantsCount[] = [
    {
      id: 1,
      participantsCount: '1-4 человека'
    },
    {
      id: 2,
      participantsCount: '5-8 человек'
    },
    {
      id: 3,
      participantsCount: '9-12 человек'
    },
    {
      id: 4,
      participantsCount: '13-18 человек'
    },
    {
      id: 5,
      participantsCount: '19 человек и более'
    },
  ];

  services: IService[] = [
    {
      id: 1,
      icon: 'gid-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: 'hike-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: 'prices-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
  ];

  constructor() {
    this.isMainColor(Color.YELLOW);
    this.saveLastVisitDate();
    this.saveEntriesCount();
    
    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();;
    }, 1000);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    localStorage.setItem('last-visit-date', new Date().toString());
  }

  private saveEntriesCount(): void {
    let entriesCount: number = Number(localStorage.getItem('entries-count')) || 0;
    entriesCount++;
    localStorage.setItem('entries-count', String(entriesCount));
  }

  selectService(serviceId: number): void {
    this.selectedServiceId = serviceId;
  }

  increaseCount(): void {
    this.clickCounter++;
  }
  
  reduceCount(): void {
    this.clickCounter--;
  }

  switchTask(): void {
    this.switchFlag = !this.switchFlag;
  }
}