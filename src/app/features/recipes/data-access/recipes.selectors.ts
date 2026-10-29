import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRecipesState } from '../interfaces/IRecipesState';
import { IRecipe } from '../interfaces/IRecipe';

export const selectRecipesState = createFeatureSelector<IRecipesState>('recipes');

export const selectRecipes = createSelector(
  selectRecipesState,
  (state: IRecipesState): IRecipe[] => state.recipes
);

export const selectLoading = createSelector(
  selectRecipesState,
  (state: IRecipesState): boolean => state.loading
);

export const selectError = createSelector(
  selectRecipesState,
  (state: IRecipesState): string | null => state.error
);