import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MessageService } from '../../../../services/message.service';
import { ILoginRequest } from '../../interfaces/ILoginRequest';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
  });

  submit(): void {
    if (this.loginForm.valid) {
      const data: ILoginRequest = this.loginForm.getRawValue();
      this.authService.login(data).pipe(
        tap(() => {
          return this.router.navigate(['/home']);
        }),
        catchError(() => {
          this.messageService.showError('Неправильные логин и/или пароль!');
          return EMPTY;
        })
      ).subscribe();
    }
  }

}