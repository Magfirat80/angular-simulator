import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../data-access/cart.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, RouterLink, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {

  protected readonly cartService: CartService = inject(CartService);

}