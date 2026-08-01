import { IUser } from '../interfaces/IUser';
import { IToken } from '../interfaces/IToken';

export interface IAuthResponse extends IUser, IToken {}