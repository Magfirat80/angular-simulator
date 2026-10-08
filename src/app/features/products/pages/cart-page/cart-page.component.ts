import { CurrencyPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../data-access/cart.service';
import { TAX_RATE } from '../../constants/cart.constants';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, PercentPipe, RouterLink, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {

  protected readonly cartService: CartService = inject(CartService);
  protected readonly taxRate: number = TAX_RATE;
  
}