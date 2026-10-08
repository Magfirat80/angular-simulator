import { IProductQueryParams } from "./IProductQueryParams";

export interface IProductRequest {
  search: string;
  category: string | null;
  params: IProductQueryParams;
}