import { ChangeDetectionStrategy, Component, input, output, InputSignal, OutputEmitterRef } from '@angular/core';
import { SortBy } from '../../enums/SortBy';
import { Order } from '../../enums/Order';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IOption } from '../../interfaces/IOption';

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule, SelectModule, SelectButtonModule, InputTextModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent {

  protected readonly sortFieldOptions: IOption<SortBy>[] = [
    { label: 'Название', value: SortBy.TITLE },
    { label: 'Цена', value: SortBy.PRICE },
    { label: 'Рейтинг', value: SortBy.RATING },
    { label: 'Наличие', value: SortBy.STOCK },
  ];

  protected readonly sortOrderOptions: IOption<Order>[] = [
    { label: 'По возрастанию', value: Order.ASC },
    { label: 'По убыванию', value: Order.DESC },
  ];

  search: InputSignal<string> = input.required<string>();
  category: InputSignal<string | null> = input.required<string | null>();
  sortField: InputSignal<SortBy> = input.required<SortBy>();
  sortOrder: InputSignal<Order> = input.required<Order>();
  categories: InputSignal<string[]> = input.required<string[]>();
  
  searchChange: OutputEmitterRef<string> = output<string>();
  categoryChange: OutputEmitterRef<string | null> = output<string | null>();
  sortFieldChange: OutputEmitterRef<SortBy> = output<SortBy>();
  sortOrderChange: OutputEmitterRef<Order> = output<Order>();

  protected onSearchInput(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
  
}