import { Component, inject } from '@angular/core';
import { faTelegram, IconDefinition, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  readonly config: IAppConfig = inject(APP_CONFIG);
  
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;
  faAngleRight: IconDefinition = faAngleRight;

}