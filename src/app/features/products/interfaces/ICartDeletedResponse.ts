import { ICartResponse } from './ICartResponse';

export interface ICartDeletedResponse extends ICartResponse {
  isDeleted: boolean;
  deletedOn: string;
}