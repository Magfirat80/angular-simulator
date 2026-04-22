import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input() user!: IUser;

  @Output() userDelete: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(id: number): void {
    this.userDelete.emit(this.user.id);
  }

}