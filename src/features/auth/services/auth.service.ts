import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { IUser } from "../interfaces/IUser";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  private readonly apiUrl: string = 'https://dummyjson.com/auth';

  init(): Observable<IUser | null> {
    if (!this.getToken()) {
      return of(null);
    }

    return this.http.get<IUser>('https://dummyjson.com/auth/me').pipe(
      tap((user: IUser) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response: IAuthResponse) => {
        this.localStorageService.setValue('accessToken', response.accessToken);
        this.localStorageService.setValue('refreshToken', response.refreshToken);
        this.currentUserSubject.next(response);
      })
    );
  }

  logout(): void {
    this.localStorageService.removeValue('accessToken');
    this.localStorageService.removeValue('refreshToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.localStorageService.getValue<string>('accessToken');
  }

  isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }

    return false;
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getValue<string>('refreshToken');
  }

  refresh(): Observable<IAuthResponse> {
    const oldRefreshToken: string | null = this.getRefreshToken();
    if (!oldRefreshToken) {
      return throwError(() => new Error('RefreshToken отсутствует'));  
    };

    return this.http.post<IAuthResponse>(`${this.apiUrl}/refresh`, { refreshToken: oldRefreshToken }).pipe(
      tap((response: IAuthResponse) => {
        this.localStorageService.setValue('accessToken', response.accessToken);
        this.localStorageService.setValue('refreshToken', response.refreshToken);
        this.currentUserSubject.next(response);
      }),
    );
  };

}