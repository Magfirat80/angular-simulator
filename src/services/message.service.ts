import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { Message } from '../enums/Message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(type: Message, content: string): void {
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