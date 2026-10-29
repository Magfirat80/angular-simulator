import { ActionReducer, createReducer, on } from '@ngrx/store';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';
import { initialState } from './recipes.state';
import { IRecipesState } from '../interfaces/IRecipesState';
import { IRecipe } from '../interfaces/IRecipe';

export const recipesReducer: ActionReducer<IRecipesState> = createReducer(
  initialState,

  on(loadRecipes, (state: IRecipesState): IRecipesState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadRecipesSuccess, (state: IRecipesState, { recipes }: { recipes: IRecipe[] }): IRecipesState => ({
    ...state,
    recipes,
    loading: false,
  })),

  on(loadRecipesFailure, (state: IRecipesState, { error }: { error: string }): IRecipesState => ({
    ...state,
    error,
    loading: false,
  })),
);