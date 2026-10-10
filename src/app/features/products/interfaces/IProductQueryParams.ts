import { SortBy } from '../enums/SortBy';
import { Order } from '../enums/Order';

export interface IProductQueryParams {
  limit: number;
  skip: number;
  sortBy: SortBy;
  order: Order;
}