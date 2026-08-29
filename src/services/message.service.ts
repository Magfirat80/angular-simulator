import { inject, Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  readonly config: IAppConfig = inject(APP_CONFIG);
  private translateService: TranslateService = inject(TranslateService);
  
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

  showWarn(key: string): void {
    this.addMessage(
      Message.WARN,
      this.translateService.instant(key),
    );
  }

  showError(key: string): void {
    this.addMessage(
      Message.ERROR,
      this.translateService.instant(key),
    );
  }

  showSuccess(key: string): void {
    this.addMessage(
      Message.SUCCESS,
      this.translateService.instant(key),
    );
  }

  showInfo(key: string): void {
    this.addMessage(
      Message.INFO,
      this.translateService.instant(key),
    );
  }

  closeMessage(message: IMessage): void {
    const currentMessages: IMessage[] = this.messagesSubject.getValue();
    const updatedMessages: IMessage[] = currentMessages.filter((m: IMessage) => m !== message);

    this.messagesSubject.next(updatedMessages);
  }

}