import { UserRole } from "../enums/user-role.enum";

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: UserRole;
}