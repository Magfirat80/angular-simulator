import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsersResponse } from '../interfaces/IUsersResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  
  private http: HttpClient = inject(HttpClient);

  getUsers(): Observable<IUsersResponse> {
    return this.http.get<IUsersResponse>('https://dummyjson.com/users');
  }

}