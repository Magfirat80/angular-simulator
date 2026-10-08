import { Order } from "../../enums/Order";
import { SortBy } from "../../enums/SortBy";

export const SORT_FIELD_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Название', value: SortBy.TITLE },
  { label: 'Цена', value: SortBy.PRICE },
  { label: 'Рейтинг', value: SortBy.RATING },
  { label: 'Наличие', value: SortBy.STOCK },
];

export const SORT_ORDER_OPTIONS: { label: string; value: Order }[] = [
  { label: 'По возрастанию', value: Order.ASC },
  { label: 'По убыванию', value: Order.DESC },
];