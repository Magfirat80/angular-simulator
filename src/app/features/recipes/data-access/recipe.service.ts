import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/recipes';

  getRecipes(): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>(this.apiUrl);
  }
  
}