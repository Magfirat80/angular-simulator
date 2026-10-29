import { IRecipesState } from '../interfaces/IRecipesState';

export const initialState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};