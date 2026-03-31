import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, finalize, of, delay, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { MessageService } from './message.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]); 
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  loadUsers(): Observable<IUser[]> {
    this.loaderService.showSpinner();
    return this.userApiService.getUsers()
      .pipe(
        delay(3000),
        catchError(() => {
          this.messageService.showError('Ошибка! Не получены сведения о пользователях!');
          return of([]);
        }),
        finalize(() => this.loaderService.hideSpinner()),
      );
  }

}