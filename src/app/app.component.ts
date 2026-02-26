import { Component, inject } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import './collection'
import { IAdvantage } from '../interfaces/IAdvantage';
import { FormsModule } from '@angular/forms';
import { IParticipantsCount } from '../interfaces/IParticipantsCount';
import { ITourLocation } from '../interfaces/ITourLocation';
import { IDestinationMap } from '../interfaces/IDestinationMap';
import { IArticle } from '../interfaces/IArticle';
import { MessageService } from './message.service';
import { Message } from "../enums/Message";
import { NgTemplateOutlet, NgComponentOutlet } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, LocalStorageService]
})
export class AppComponent {
  
  companyName: string = 'румтибет';
  selectedTour: string = '';
  selectedGroup: string = '';
  selectedDate!: string;
  selectedAdvantageId: number = 2;
  currentDateAndTime: string = new Date().toLocaleString();
  counter: number = 0;
  currentWidget:  'counter' | 'date' = 'counter';
  liveInput!: string;
  isLoading: boolean = true;
  messageService: MessageService = inject(MessageService);
  message: typeof Message = Message;
  localStorageService: LocalStorageService = inject(LocalStorageService);

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

  advantages: IAdvantage[] = [
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

  maps: IDestinationMap[] = [
    {
      id: 1,
      backgroundName: 'destination-lake',
      estimation: '4.9',
      destinationName: 'Озеро возле гор',
      destinationDescription: 'романтическое приключение',
      destinationCost: 480
    },
    {
      id: 2,
      backgroundName: 'destination-night',
      estimation: '4.5',
      destinationName: 'Ночь в горах',
      destinationDescription: 'в компании друзей',
      destinationCost: 500
    },
    {
      id: 3,
      backgroundName: 'destination-sport',
      estimation: '5.0',
      destinationName: 'Спорт в горах',
      destinationDescription: 'для тех, кто заботится о себе',
      destinationCost: 230
    },
 ];

 articles: IArticle[] = [
  {
    id: 1,
    articleIllustration: 'article-Italy',
    title: 'Красивая Италия, какая она в реальности?',
    introduction: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    date: '01/04/2023'
  },
  {
    id: 2,
    articleIllustration: 'article-flight',
    title: 'Долой сомнения! Весь мир открыт для вас!',
    introduction: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
    date: '01/04/2023'
  },
  {
    id: 3,
    articleIllustration: 'article-travel-alone',
    title: 'Как подготовиться к путешествию в одиночку? ',
    introduction: 'Для современного мира базовый вектор развития предполагает.',
    date: '01/04/2023'
  },
  {
    id: 4,
    articleIllustration: 'article-India',
    title: 'Индия ... летим?',
    introduction: 'Для современного мира базовый.',
    date: '01/04/2023'
  },
 ];

  constructor() {
    this.isMainColor(Color.YELLOW);
    this.saveLastVisitDate();
    this.saveEntriesCount();
    this.removeValue('entries-count');
    this.clearAllValues();

    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();
    }, 1000);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    this.localStorageService.setValueStorage('last-visit-date', new Date().toString());
  }

  private saveEntriesCount(): void {
    let entriesCount: number = Number(this.localStorageService.getValueStorage('entries-count')) || 0;
    entriesCount++;
    this.localStorageService.setValueStorage('entries-count', String(entriesCount));
  }

  private removeValue(key: string): void {
    this.localStorageService.removeValueStorage(key);
  }

  private clearAllValues(): void {
    this.localStorageService.clearStorage();
  }

  selectAdvantage(advantageId: number): void {
    this.selectedAdvantageId = advantageId;
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