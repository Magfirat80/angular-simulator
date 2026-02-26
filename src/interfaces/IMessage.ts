import { Message } from "../enums/Message";

export interface IMessage {
  messageType: Message;
  messageContent: string
}