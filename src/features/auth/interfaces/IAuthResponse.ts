import { IUser } from "../interfaces/IUser";

export interface IAuthResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}