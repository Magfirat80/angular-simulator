import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  
}