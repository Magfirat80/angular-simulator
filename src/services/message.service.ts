import { inject, Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  readonly config: IAppConfig = inject(APP_CONFIG);
  
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(type: Message, content: string): void {
    if (!this.config.enableNotifications) {
      return;
    }
    
    const newMessage: IMessage = { type, content };
    
    this.messagesSubject.next([...this.messagesSubject.getValue(), newMessage]);
  
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  showWarn(content: string): void {
    this.addMessage(Message.WARN, content);
  }

  showError(content: string): void {
    this.addMessage(Message.ERROR, content);
  }

  showSuccess(content: string): void {
    this.addMessage(Message.SUCCESS, content);
  }

  showInfo(content: string): void {
    this.addMessage(Message.INFO, content);
  }

  closeMessage(message: IMessage): void {
    const currentMessages: IMessage[] = this.messagesSubject.getValue();
    const updatedMessages: IMessage[] = currentMessages.filter((m: IMessage) => m !== message);

    this.messagesSubject.next(updatedMessages);
  }

}