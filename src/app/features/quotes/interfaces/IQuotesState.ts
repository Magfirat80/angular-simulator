import { IQuote } from './IQuote';

export enum QuotesFilter {
  ALL = 'all',
  FAVORITES = 'favorites'
}

export interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}