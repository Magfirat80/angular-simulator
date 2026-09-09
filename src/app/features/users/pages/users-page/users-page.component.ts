import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../data-access/user.service';
import { BehaviorSubject, combineLatest, map, tap, type Observable } from 'rxjs';
import { IUser } from '../../models/IUser';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../../../../shared/components/user-card/user-card.component';
import { CreateUserComponent } from '../../ui/create-user/create-user.component';
import { UsersFilterComponent } from '../../ui/users-filter/users-filter.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent, TranslatePipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  
  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterSubject.asObservable(),
  ]).pipe(
    map(([users, filter]: [IUser[], string]) =>
      users.filter((user: IUser) => user.name.toLowerCase().includes(filter)),
    ),
  );

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(tap((user: IUser[]) => this.userService.setUsers(user)))
      .subscribe();
  }

  onFilterUsers(value: string): void {
    this.filterSubject.next(value);
  }

  onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  onSumbit(user: IUser): void {
    this.userService.createUser(user);
  }

}