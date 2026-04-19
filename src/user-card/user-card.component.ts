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

  @Output() deleteRequested: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(id: number): void {
    this.deleteRequested.emit(this.user.id);
  }

}