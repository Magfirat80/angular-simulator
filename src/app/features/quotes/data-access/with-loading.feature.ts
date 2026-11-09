import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export function withLoadingFeature() {
  return signalStoreFeature(
    withState({
      loading: false,
      error: null as string | null
    }),

    withMethods((store) => ({
      setLoading(loading: boolean): void {
        patchState(store, { loading });
      },

      setError(error: string | null): void {
        patchState(store, {
          error,
          loading: false
        });
      },

      clearError(): void {
        patchState(store, { error: null });
      }
    }))
  );
}