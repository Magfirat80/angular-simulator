import { Component, input } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import './collection'
import { IService } from '../interfaces/IService';
import { FormsModule } from '@angular/forms';
import { IParticipantsNumber } from '../interfaces/IParticipantsNumber';
import { ITourLocation } from '../interfaces/ITourLocation';
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  public companyName: string = 'румтибет';
  public selectedTour: string = '';
  public selectedGroup: string = '';
  public selectedDate: string = '';
  public selectedServiceId: number = 2;
  public currentDateAndTime: string = '';
  public clickCounter: number = 0;
  public switchFlag: boolean = true;
  public liveInput: string = '';
  public isLoading: boolean = true;

  public locations: ITourLocation[] = [
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
  ]

  public groups: IParticipantsNumber[] = [
    {
      id: 1,
      participantsNumber: '1-4 человека'
    },
    {
      id: 2,
      participantsNumber: '5-8 человек'
    },
    {
      id: 3,
      participantsNumber: '9-12 человек'
    },
    {
      id: 4,
      participantsNumber: '13-18 человек'
    },
    {
      id: 5,
      participantsNumber: '19 человек и более'
    },
  ]

  public services: IService[] = [
    {
      id: 1,
      icon: '/images/gid-icon.svg',
      alt: 'gid-icon',
      textHeader: 'Опытный гид',
      textDescription: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: '/images/hike-icon.svg',
      alt: 'hike-icon',
      textHeader: 'Безопасный поход',
      textDescription: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: '/images/prices-icon.svg',
      alt: 'prices-icon',
      textHeader: 'Лояльные цены',
      textDescription: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
  ]

  constructor() {
    this.isMainColor(Color.YELLOW);
    this.saveLastVisitDate();
    this.saveEntriesCount();
    
    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();
    }, 1000);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  public isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  public saveLastVisitDate(): void {
    localStorage.setItem('last-visit-date', new Date().toString());
  }

  public saveEntriesCount(): void {
    let entriesCount: number = Number(localStorage.getItem('entries-count')) || 0;
    entriesCount++;
    localStorage.setItem('entries-count', String(entriesCount));
  }

  public selectService(serviceId: number): void {
    this.selectedServiceId = serviceId;
  }

  public increaseCount(): void {
    this.clickCounter++;
  }
  
  public reduceCount(): void {
    this.clickCounter--;
  }

  public switchTask(): void {
    this.switchFlag = !this.switchFlag;
  }
}