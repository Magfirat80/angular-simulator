import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages;
  }

  private addMessage(type: Message, content: string): void {
    const newMessage: IMessage = { type, content }
    this.messages = [...this.messages, newMessage];
  
    setTimeout(() => {
      this.closeMessage(newMessage)
    }, 5000);
  }

  showWarn(content: string) {
    this.addMessage(Message.WARN, content);
  }

  showError(content: string) {
    this.addMessage(Message.ERROR, content);
  }

  showSuccess(content: string) {
    this.addMessage(Message.SUCCESS, content);
  }

  showInfo(content: string) {
    this.addMessage(Message.INFO, content);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }

}