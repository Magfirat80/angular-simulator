import { IUser } from './IUser';
import { IToken } from './IToken';

export interface IAuthResponse extends IUser, IToken {}