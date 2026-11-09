import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { IQuote } from '../interfaces/IQuote';
import { IQuotesState, type QuotesFilter } from '../interfaces/IQuotesState';
import { withLoadingFeature } from './with-loading.feature';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { QuotesApiService } from './quotes-api.service';

const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  filter: 'all',
  randomQuote: null
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },

  withLoadingFeature(),

  withState(initialState),

  withComputed(({ quotes, favorites, filter }) => ({
    favoritesCount: computed(() => favorites().length),

    authorsCount: computed(() =>
      new Set(quotes().map(quote => quote.author)).size
    ),

    filteredQuotes: computed(() => {
      if (filter() === 'favorites') {
        return favorites();
      }

      return quotes();
    })
  })),

  withMethods((store) => {
    const quotesApi: QuotesApiService = inject(QuotesApiService);

    return {
      toggleFavorite(quote: IQuote): void {
        const exists: boolean = store.favorites().some(
          item => item.id === quote.id
        );

        patchState(store, {
          favorites: exists
            ? store.favorites().filter(item => item.id !== quote.id)
            : [...store.favorites(), quote]
        });
      },

      setFilter(filter: QuotesFilter): void {
        patchState(store, { filter });
      },

      showRandomQuote(): void {
        const quotes: IQuote[] = store.quotes();

        if (!quotes.length) {
          patchState(store, { randomQuote: null });
          return;
        }

        const index: number = Math.floor(Math.random() * quotes.length);

        patchState(store, {
          randomQuote: quotes[index]
        });
      },

      loadQuotes: rxMethod<void>(
        pipe(
          tap(() => {
            store.setLoading(true);
            store.clearError();
          }),

          switchMap(() =>
            quotesApi.getQuotes().pipe(
              tap((response) => {
                patchState(store, {
                  quotes: response.quotes
                });

                store.setLoading(false);
              }),

              catchError(() => {
                store.setError('Failed to load quotes');
                return EMPTY;
              })
            )
          )
        )
      )
    };
  })

);