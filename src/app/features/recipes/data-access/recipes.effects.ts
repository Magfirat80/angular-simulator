import { inject, Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, Observable } from 'rxjs';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RecipesEffects {
  
  private readonly actions$: Actions = inject(Actions);
  private readonly recipesService: RecipeService = inject(RecipeService);

  readonly loadRecipes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      switchMap(() => this.recipesService.getRecipes().pipe(
        map((response: IRecipesResponse) => loadRecipesSuccess({ recipes: response.recipes })),
        catchError((err: HttpErrorResponse) =>
          of(loadRecipesFailure({ error: err.message }))
        )
      ))
    )
  );

}