import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { CartApiService } from './cart-api.service';
import { ICartItem } from '../interfaces/ICartItem';
import { ICartProductPayload } from '../interfaces/ICartProductPayload';
import { ICartResponse } from '../interfaces/ICartResponse';
import { IProduct } from '../interfaces/IProduct';
import { TAX_RATE } from '../constants/cart.constants';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly cartApi: CartApiService = inject(CartApiService);

  private readonly userId: number = 1;

  private cartId: number | null = null;

  private readonly _items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  readonly items: Signal<ICartItem[]> = this._items.asReadonly();

  readonly itemsCount: Signal<number> = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal: Signal<number> = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  readonly tax: Signal<number> = computed(() => this.subtotal() * TAX_RATE);
  readonly total: Signal<number> = computed(() => this.subtotal() + this.tax());

  constructor() {
    this.loadUserCart();
  }

  add(product: IProduct): void {
    const items: ICartItem[] = this._items();
    const existing: ICartItem | undefined = items.find(item => item.id === product.id);

    const next: ICartItem[] = existing
      ? items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [
          ...items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            thumbnail: product.thumbnail,
          },
        ];

    this.commit(next);
  }

  setQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }
    this.commit(
      this._items().map(item => (item.id === id ? { ...item, quantity } : item))
    );
  }

  remove(id: number): void {
    this.commit(this._items().filter(item => item.id !== id));
  }

  clear(): void {
    const cartId: number | null = this.cartId;

    this._items.set([]);
    this.cartId = null;

    if (cartId === null) {
      return;
    }
    this.cartApi.deleteCart(cartId).pipe(
      catchError(() => EMPTY)
    ).subscribe();
  }

  private commit(next: ICartItem[]): void {
    this._items.set(next);
    this.sync(next).pipe(
      catchError(() => EMPTY)
    ).subscribe();
  }

  private sync(items: ICartItem[]): Observable<ICartResponse> {
    const products: ICartProductPayload[] = items.map(({ id, quantity }) => ({ id, quantity }));

    if (this.cartId === null) {
      return this.cartApi.addCart(this.userId, products).pipe(
        tap(cart => (this.cartId = cart.id))
      );
    }
    return this.cartApi.updateCart(this.cartId, products);
  }

  private loadUserCart(): void {
    this.cartApi.getUserCarts(this.userId).pipe(
      tap(({ carts }) => {
        const cart: ICartResponse | undefined = carts[0];
        this.cartId = cart?.id ?? null;
        this._items.set(cart?.products ?? []);
      }),
      catchError(() => EMPTY)
    ).subscribe();
  }

}