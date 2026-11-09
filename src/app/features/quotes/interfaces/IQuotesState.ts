import { IQuote } from './IQuote';

export type QuotesFilter = 'all' | 'favorites';

export interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}