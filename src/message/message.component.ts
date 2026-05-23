import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { faCircleXmark, IconDefinition, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  faCircleXmark: IconDefinition = faCircleXmark;
  faEnvelopeOpen: IconDefinition = faEnvelopeOpen;

  messageService: MessageService = inject(MessageService);

}