import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SortBy } from '../enums/SortBy';
import { Order } from '../enums/Order';
import { ProductApiService } from './product-api.service';
import { IProductQueryParams } from '../interfaces/IProductQueryParams';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap, Observable, catchError, of, finalize } from 'rxjs';
import { IProductsResponse } from '../interfaces/IProductsResponse';
import { IProduct } from '../interfaces/IProduct';
import type { IProductRequest } from '../interfaces/IProductRequest';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly productApi: ProductApiService = inject(ProductApiService);

  private readonly emptyResponse: IProductsResponse = {
    products: [], total: 0, skip: 0, limit: 0
  };

  private readonly _search: WritableSignal<string> = signal<string>('');
  private readonly _selectedCategory: WritableSignal<string | null> = signal<string | null>(null);
  private readonly _page: WritableSignal<number> = signal<number>(1);
  private readonly _pageSize: WritableSignal<number> = signal<number>(10);
  private readonly _sortField: WritableSignal<SortBy> = signal<SortBy>(SortBy.TITLE);
  private readonly _sortOrder: WritableSignal<Order> = signal<Order>(Order.ASC);
  private readonly _loading: WritableSignal<boolean> = signal<boolean>(true);

  readonly search: Signal<string> = this._search.asReadonly();
  readonly selectedCategory: Signal<string | null> = this._selectedCategory.asReadonly();
  readonly page: Signal<number> = this._page.asReadonly();
  readonly pageSize: Signal<number> = this._pageSize.asReadonly();
  readonly sortField: Signal<SortBy> = this._sortField.asReadonly();
  readonly sortOrder: Signal<Order> = this._sortOrder.asReadonly();
  readonly loading: Signal<boolean> = this._loading.asReadonly();

  readonly skip: Signal<number> = computed(() => (this.page() - 1) * this.pageSize());

  setSearch(value: string): void {
    this._search.set(value);
    this._page.set(1);
    if (value) {
      this._selectedCategory.set(null);
    }
  }

  setCategory(value: string | null): void {
    this._selectedCategory.set(value);
    this._page.set(1);
    this._search.set('');
  }

  setSortField(value: SortBy): void {
    this._sortField.set(value);
    this._page.set(1);
  }

  setSortOrder(value: Order): void {
    this._sortOrder.set(value);
    this._page.set(1);
  }

  setPageSize(value: number): void {
    this._pageSize.set(value);
    this._page.set(1);
  }

  setPage(value: number): void {
    this._page.set(value);
  }

  readonly queryParams: Signal<IProductQueryParams> = computed<IProductQueryParams>(() => ({
    limit: this._pageSize(),
    skip: this.skip(),
    sortBy: this._sortField(),
    order: this._sortOrder()
  }));

  readonly request: Signal<IProductRequest> = computed<IProductRequest>(() => ({
    search: this._search(),
    category: this._selectedCategory(),
    params: this.queryParams()
  }));

  private readonly requestObservable: Observable<IProductsResponse> = toObservable(this.request).pipe(
    debounceTime(300),
    switchMap(({ search, category, params }) => {
      this._loading.set(true);

      let request$: Observable<IProductsResponse>;

      if (search) {
        request$ = this.productApi.searchProducts(search, params);
      }
      else if (category) {
        request$ = this.productApi.getProductsByCategory(category, params);
      } else {
        request$ = this.productApi.getProducts(params);
      }

      return request$.pipe(
        catchError(() => of(this.emptyResponse)),
        finalize(() => this._loading.set(false))
      );
    })
  );

  private readonly requestSignal: Signal<IProductsResponse> = toSignal(this.requestObservable, {
    initialValue: this.emptyResponse
  });

  readonly products: Signal<IProduct[]> = computed(() => this.requestSignal().products);

  readonly total: Signal<number> = computed(() => this.requestSignal().total);

  readonly categories: Signal<string[]> = toSignal(this.productApi.getCategories(), {
    initialValue: []
  });

}