import { Component, inject } from '@angular/core';
import { UserService } from '../app/user.service';
import { tap, type Observable } from 'rxjs';
import type { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  
  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user))
      ).subscribe();
  }

}