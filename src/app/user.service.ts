import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, finalize, of, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
   
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]); 
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setValue('users', JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(): Observable<IUser[]> {
    const usersFromStorage: IUser[] | null = this.localStorageService.getValue('users');
    
    if (usersFromStorage) {
      return of(usersFromStorage);
    } else {
      this.loaderService.showSpinner();
      return this.userApiService.getUsers()
        .pipe(
          catchError(() => {
            this.messageService.showError('Ошибка! Не получены сведения о пользователях!');
            return of([]);
          }),
          finalize(() => this.loaderService.hideSpinner()),
        );
    }
  }

  deleteUser(userId: number): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = currentUsers.filter((user: IUser) => user.id !== userId);
    
    this.setUsers(updatedUsers); 
    this.messageService.showSuccess('Пользователь удален!!!');
  }

  createUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];

    this.setUsers(updatedUsers);
  }

}