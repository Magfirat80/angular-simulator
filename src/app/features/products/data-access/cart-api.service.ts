import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartResponse } from '../interfaces/ICartResponse';
import { ICartsResponse } from '../interfaces/ICartsResponse';
import { ICartProductPayload } from '../interfaces/ICartProductPayload';
import { ICartDeletedResponse } from '../interfaces/ICartDeletedResponse';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/carts';

  getUserCarts(userId: number): Observable<ICartsResponse> {
    return this.http.get<ICartsResponse>(`${this.apiUrl}/user/${userId}`);
  }

  addCart(userId: number, products: ICartProductPayload[]): Observable<ICartResponse> {
    return this.http.post<ICartResponse>(`${this.apiUrl}/add`, { userId, products });
  }

  updateCart(cartId: number, products: ICartProductPayload[]): Observable<ICartResponse> {
    return this.http.put<ICartResponse>(`${this.apiUrl}/${cartId}`, { merge: false, products });
  }

  deleteCart(cartId: number): Observable<ICartDeletedResponse> {
    return this.http.delete<ICartDeletedResponse>(`${this.apiUrl}/${cartId}`);
  }

}