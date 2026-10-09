import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { CartApiService } from './cart-api.service';
import { ICartItem } from '../interfaces/ICartItem';
import { ICartProductPayload } from '../interfaces/ICartProductPayload';
import { ICartResponse } from '../interfaces/ICartResponse';
import { ICartsResponse } from '../interfaces/ICartsResponse';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly cartApi: CartApiService = inject(CartApiService);

  private readonly userId: number = 1;

  private readonly taxRate: number = 0.2;

  private cartId: number | null = null;

  private readonly _items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  readonly items: Signal<ICartItem[]> = this._items.asReadonly();

  readonly itemsCount: Signal<number> = computed(() =>
    this._items().reduce((sum: number, item: ICartItem) => sum + item.quantity, 0)
  );

  readonly subtotal: Signal<number> = computed(() =>
    this._items().reduce((sum: number, item: ICartItem) => sum + item.price * item.quantity, 0)
  );

  readonly tax: Signal<number> = computed(() => this.subtotal() * this.taxRate);
  readonly total: Signal<number> = computed(() => this.subtotal() + this.tax());

  constructor() {
    this.loadUserCart();
  }

  add(product: IProduct): void {
    const existing: ICartItem | undefined = this._items().find(
      (item: ICartItem) => item.id === product.id
    );

    if (existing) {
      this.setQuantity(existing.id, existing.quantity + 1);
      return;
    }

    const next: ICartItem[] = [...this._items(), this.toCartItem(product)];

    this.commit(next);
  }

  setQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }

    const next: ICartItem[] = this._items().map((item: ICartItem) =>
      item.id === id ? { ...item, quantity } : item
    );

    this.commit(next);
  }

  remove(id: number): void {
    const next: ICartItem[] = this._items().filter((item: ICartItem) => item.id !== id);

    this.commit(next);
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

  private toCartItem({ id, title, price, thumbnail }: IProduct): ICartItem {
    return { id, title, price, thumbnail, quantity: 1 };
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
        tap((cart: ICartResponse) => (this.cartId = cart.id))
      );
    }

    return this.cartApi.updateCart(this.cartId, products);
  }

  private loadUserCart(): void {
    this.cartApi.getUserCarts(this.userId).pipe(
      tap(({ carts }: ICartsResponse) => {
        const cart: ICartResponse | undefined = carts[0];
        
        this.cartId = cart?.id ?? null;
        this._items.set(cart?.products ?? []);
      }),
      catchError(() => EMPTY)
    ).subscribe();
  }

}