import { inject, Injectable } from '@angular/core';
import { IProductsResponse } from '../interfaces/IProductsResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/IProduct';
import { IProductQueryParams } from '../interfaces/IProductQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/products';

  getProducts(params: IProductQueryParams): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(this.apiUrl, { params: { ...params } });
  }

  searchProducts(
    query: string,
    params: IProductQueryParams
  ): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(`${this.apiUrl}/search`, {
      params: {
        q: query,
        ...params
      }
    })
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`)
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/category-list`)
  }

  getProductsByCategory(category: string, params: IProductQueryParams): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(
      `${this.apiUrl}/category/${category}`,
      { params: { ...params } }
    );
  }

}