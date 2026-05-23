import { Component, inject } from '@angular/core';
import { ITourLocation } from '../interfaces/ITourLocation';
import { IAdvantage } from '../interfaces/IAdvantage';
import { IDestinationMap } from '../interfaces/IDestinationMap';
import { IParticipantsCount } from '../interfaces/IParticipantsCount';
import { IArticle } from '../interfaces/IArticle';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPeopleGroup,
  faShield,
  faTags,
  faThumbsUp,
  IconDefinition,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  faThumbsUp: IconDefinition = faThumbsUp;
  faStar: IconDefinition = faStar;
  faCalendar: IconDefinition = faCalendar;

  messageService: MessageService = inject(MessageService);

  selectedTour: string = '';
  selectedGroup: string = '';
  selectedDate!: string;
  liveInput!: string;
  selectedAdvantageId: number = 2;

  locations: ITourLocation[] = [
    {
      id: 1,
      tourLocation: 'Восхождение на Эльбрус',
    },
    {
      id: 2,
      tourLocation: 'Кольцо Эльбруса',
    },
    {
      id: 3,
      tourLocation: 'Поход к Белухе',
    },
    {
      id: 4,
      tourLocation: 'Шавлинские озёра',
    },
    {
      id: 5,
      tourLocation: 'Уральский Барс',
    },
    {
      id: 6,
      tourLocation: 'Треккинг в Хибинах',
    },
    {
      id: 7,
      tourLocation: 'Долина вулканов',
    },
  ];

  groups: IParticipantsCount[] = [
    {
      id: 1,
      participantsCount: '1-4 человека',
    },
    {
      id: 2,
      participantsCount: '5-8 человек',
    },
    {
      id: 3,
      participantsCount: '9-12 человек',
    },
    {
      id: 4,
      participantsCount: '13-18 человек',
    },
    {
      id: 5,
      participantsCount: '19 человек и более',
    },
  ];

  advantages: IAdvantage[] = [
    {
      id: 1,
      icon: faPeopleGroup,
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      icon: faShield,
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      icon: faTags,
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  maps: IDestinationMap[] = [
    {
      estimation: '4.9',
      name: 'Озеро возле гор',
      description: 'романтическое приключение',
      cost: 480,
      poster: 'destination-lake',
    },
    {
      estimation: '4.5',
      name: 'Ночь в горах',
      description: 'в компании друзей',
      cost: 500,
      poster: 'destination-night',
    },
    {
      estimation: '5.0',
      name: 'Спорт в горах',
      description: 'для тех, кто заботится о себе',
      cost: 230,
      poster: 'destination-sport',
    },
  ];

  articles: IArticle[] = [
    {
      id: 1,
      articleIllustration: 'article-Italy',
      title: 'Красивая Италия, какая она в реальности?',
      introduction:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
    },
    {
      id: 2,
      articleIllustration: 'article-flight',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      introduction:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
    },
    {
      id: 3,
      articleIllustration: 'article-travel-alone',
      title: 'Как подготовиться к путешествию в одиночку? ',
      introduction: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
    },
    {
      id: 4,
      articleIllustration: 'article-India',
      title: 'Индия ... летим?',
      introduction: 'Для современного мира базовый.',
      date: '01/04/2023',
    },
  ];

  selectAdvantage(advantageId: number): void {
    this.selectedAdvantageId = advantageId;
  }

}