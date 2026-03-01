import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: IMessage[] = [];
  
  addMessage(message: IMessage): void {
    this.messages = [...this.messages, message];
    
    setTimeout(() => {
      this.closeMessage(message)
    }, 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }

}