import { IUser } from "./IUser";

export interface IUsersResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}