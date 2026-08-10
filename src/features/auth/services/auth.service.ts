import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { IToken } from '../interfaces/IToken';
import { IUser } from '../interfaces/IUser';
import { MessageService } from '../../../services/message.service';
import { APP_CONFIG } from '../../../tokens/app-config.token';
import { IAppConfig } from '../../../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private messageService: MessageService = inject(MessageService);

  readonly config: IAppConfig = inject(APP_CONFIG);

  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  private readonly apiUrl: string = 'https://dummyjson.com/auth';

  init(): Observable<IUser | null> {
    if (!this.getToken('accessToken')) {
      return of(null);
    }

    return this.http.get<IUser>(`${ this.apiUrl }/me`).pipe(
      tap((user: IUser) => {
        const tokens: IToken | null = this.localStorageService.getValue<IToken>('tokens');
        
        if (!tokens) {
          return;
        }

        this.currentUserSubject.next(user);
      })
    );
  }

  login(data: ILoginRequest): Observable<IUser | null> {
    return this.http.post<IAuthResponse>(
      `${ this.apiUrl }/login`, 
      {
        ...data,
        expiresInMins: this.config.sessionTimeout,
      }
    ).pipe(
      tap((response: IAuthResponse) => {
        this.saveTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });

        this.localStorageService.setValue('lastLogin', new Date().toISOString());
      }),
      switchMap(() => this.init()),
      catchError((error: Error) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      })
    );
  }

  getLastLogin(): Date | null {
    const lastLogin: string | null = this.localStorageService.getValue<string>('lastLogin');
    return lastLogin ? new Date(lastLogin) : null;
  }

  private saveTokens(tokens: IToken): void {
    this.localStorageService.setValue('tokens', tokens);
  }

  logout(): void {
    this.localStorageService.removeValue('tokens');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(type: keyof IToken): string | null {
    return this.localStorageService.getValue<IToken>('tokens')?.[type] ?? null;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  refresh(): Observable<IUser | null> {
    const oldRefreshToken: string | null = this.getToken('refreshToken');
    
    if (!oldRefreshToken) {
      return throwError(() => new Error('RefreshToken отсутствует'));
    };

    return this.http.post<IAuthResponse>(
      `${ this.apiUrl }/refresh`,
      {
        refreshToken: oldRefreshToken,
        expiresInMins: this.config.sessionTimeout,
    }).pipe(
      tap((response: IAuthResponse) => {
        this.saveTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
      }),
      switchMap(() => this.init()),
    );
  }

  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

}