import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../app/user.service';
import type { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {

  @Output() createRequested: EventEmitter<IUser> = new EventEmitter<IUser>();

  private formBuilder: FormBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
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

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const user: IUser = { id: Date.now(), ... this.myForm.getRawValue()};

    this.createRequested.emit(user);
  }

}