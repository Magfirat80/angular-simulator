import { Message } from '../enums/Message';

export interface IMessage {
  type: Message;
  content: string;
}