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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, CommonModule, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  
  faThumbsUp: IconDefinition = faThumbsUp;
  faStar: IconDefinition = faStar;
  faCalendar: IconDefinition = faCalendar;

  messageService: MessageService = inject(MessageService);

  selectedTour = '';
  selectedGroup = '';
  selectedDate!: string;
  liveInput!: string;
  selectedAdvantageId = 2;

  locations: ITourLocation[] = [
    {
      id: 1,
      tourLocation: 'HOME.LOCATIONS.ELBRUS_ASCENT',
    },
    {
      id: 2,
      tourLocation: 'HOME.LOCATIONS.ELBRUS_RING',
    },
    {
      id: 3,
      tourLocation: 'HOME.LOCATIONS.BELUKHA_HIKE',
    },
    {
      id: 4,
      tourLocation: 'HOME.LOCATIONS.SHAVLIN_LAKES',
    },
    {
      id: 5,
      tourLocation: 'HOME.LOCATIONS.URAL_BAR',
    },
    {
      id: 6,
      tourLocation: 'HOME.LOCATIONS.KHIBINY_TREKKING',
    },
    {
      id: 7,
      tourLocation: 'HOME.LOCATIONS.VOLCANO_VALLEY',
    },
  ];

  groups: IParticipantsCount[] = [
    {
      id: 1,
      participantsCount: 'HOME.GROUPS.FOUR',
    },
    {
      id: 2,
      participantsCount: 'HOME.GROUPS.EIGHT',
    },
    {
      id: 3,
      participantsCount: 'HOME.GROUPS.TWELVE',
    },
    {
      id: 4,
      participantsCount: 'HOME.GROUPS.EIGHTEEN',
    },
    {
      id: 5,
      participantsCount: 'HOME.GROUPS.MORE',
    },
  ];

  advantages: IAdvantage[] = [
    {
      id: 1,
      icon: faPeopleGroup,
      title: 'HOME.ADVANTAGE_GUIDE',
      description: 'HOME.ADVANTAGE_GUIDE_DESCRIPTION',
    },
    {
      id: 2,
      icon: faShield,
      title: 'HOME.ADVANTAGE_SAFE',
      description: 'HOME.ADVANTAGE_SAFE_DESCRIPTION',
    },
    {
      id: 3,
      icon: faTags,
      title: 'HOME.ADVANTAGE_PRICES',
      description: 'HOME.ADVANTAGE_PRICES_DESCRIPTION',
    },
  ];

  maps: IDestinationMap[] = [
    {
      estimation: '4.9',
      cost: 480,
      poster: 'destination-lake',
    },
    {
      estimation: '4.5',
      cost: 500,
      poster: 'destination-night',
    },
    {
      estimation: '5.0',
      cost: 230,
      poster: 'destination-sport',
    },
  ];

  articles: IArticle[] = [
    {
      id: 1,
      articleIllustration: 'article-Italy',
      date: '01/04/2023',
    },
    {
      id: 2,
      articleIllustration: 'article-flight',
      date: '01/04/2023',
    },
    {
      id: 3,
      articleIllustration: 'article-travel-alone',
      date: '01/04/2023',
    },
    {
      id: 4,
      articleIllustration: 'article-India',
      date: '01/04/2023',
    },
  ];

  selectAdvantage(advantageId: number): void {
    this.selectedAdvantageId = advantageId;
  }

}