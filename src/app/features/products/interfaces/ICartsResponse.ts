import { ICartResponse } from "./ICartResponse";

export interface ICartsResponse {
  carts: ICartResponse[];
  total: number;
  skip: number;
  limit: number;
}