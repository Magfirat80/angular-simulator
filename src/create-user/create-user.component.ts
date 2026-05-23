import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { IUser } from '../interfaces/IUser';
import { AppAnimatedGradientDirective } from '../directives/app-animated-gradient.directive';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, AppAnimatedGradientDirective],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  gradientOptions: IGradientConfiguration = {
    delay: 1000,
    colors: ['blue', 'pink', 'black'],
    thickness: '2px',
  };

  @Output() userCreate: EventEmitter<IUser> = new EventEmitter<IUser>();

  private formBuilder: FormBuilder = inject(FormBuilder);

  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', Validators.maxLength(100)],

    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', Validators.maxLength(50)],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],

      geo: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
    }),

    company: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)],
    }),
  });

  onSubmit(): void {
    const user: IUser = { id: Date.now(), ...this.userForm.getRawValue() };

    this.userCreate.emit(user);
  }
  
}