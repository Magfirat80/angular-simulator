import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { IToken } from '../interfaces/IToken';
import { IUser } from "../interfaces/IUser";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private currentUserSubject: BehaviorSubject<IAuthResponse | null> = new BehaviorSubject<IAuthResponse | null>(null);
  currentUser$: Observable<IAuthResponse | null> = this.currentUserSubject.asObservable();

  private readonly apiUrl: string = 'https://dummyjson.com/auth';

  init(): Observable<IUser | null> {
    if (!this.getToken('accessToken')) {
      return of(null);
    }

    return this.http.get<IUser>(`${ this.apiUrl }/me`).pipe(
      tap((user: IUser) => {
        const tokens: IToken | null = this.localStorageService.getValue<IToken>('tokens');
        
        if (tokens) {
          this.currentUserSubject.next({
            ...user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
          });
        }
      })
    );
  }

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, data).pipe(
      tap((response: IAuthResponse) => this.saveAuth(response))
    );
  }

  private saveAuth(response: IAuthResponse): void {
    this.localStorageService.setValue('tokens', {accessToken: response.accessToken, refreshToken: response.refreshToken});
    this.currentUserSubject.next(response);
  }

  logout(): void {
    this.localStorageService.removeValue('tokens');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(type: keyof IToken): string | null {
    return this.localStorageService.getValue<IAuthResponse>('tokens')?.[type] ?? null;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  refresh(): Observable<IAuthResponse> {
    const oldRefreshToken: string | null = this.getToken('refreshToken');
    if (!oldRefreshToken) {
      return throwError(() => new Error('RefreshToken отсутствует'));
    };

    return this.http.post<IAuthResponse>(`${ this.apiUrl }/refresh`, { refreshToken: oldRefreshToken }).pipe(
      tap((response: IAuthResponse) => this.saveAuth(response))
    );
  };

}