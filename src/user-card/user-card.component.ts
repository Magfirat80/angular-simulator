import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneNumberPipe } from '../app/phone-number.pipe';
import { AppBoldDirective } from '../app/app-bold.directive';
import { AppAnimatedGradientDirective } from '../app/app-animated-gradient.directive';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';
import { NumberFormatMode } from '../enums/NumberFormatMode';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumberPipe, AppBoldDirective, AppAnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  readonly numberFormatMode: NumberFormatMode = NumberFormatMode.INTERNATIONAL;

  gradientOptions: IGradientConfiguration = {
    delay: 1000,
    colors: ['green', 'red', 'yellow'],
    thickness: '2px',
  };
  
  @Input() user!: IUser;
  @Output() userDelete: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(id: number): void {
    this.userDelete.emit(this.user.id);
  }

}