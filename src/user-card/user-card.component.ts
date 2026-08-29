import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneNumberPipe } from '../pipes/phone-number.pipe';
import { AppBoldDirective } from '../directives/app-bold.directive';
import { AppAnimatedGradientDirective } from '../directives/app-animated-gradient.directive';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';
import { PhoneMode } from '../enums/PhoneMode';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumberPipe, AppBoldDirective, AppAnimatedGradientDirective, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  readonly phoneMode: PhoneMode = PhoneMode.NATIONAL;

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