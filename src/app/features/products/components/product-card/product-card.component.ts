import { ChangeDetectionStrategy, Component, input, output, InputSignal, OutputEmitterRef } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, CardModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  product: InputSignal<IProduct> = input.required<IProduct>();
  
  addToCart: OutputEmitterRef<IProduct> = output<IProduct>();
  open: OutputEmitterRef<IProduct> = output<IProduct>();

}