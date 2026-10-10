import { ResolveFn } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';
import { inject } from '@angular/core';
import { ProductApiService } from '../data-access/product-api.service';

export const productResolver: ResolveFn<IProduct> = (route) => {

  const id: number = Number(route.paramMap.get('id'));
  
  return inject(ProductApiService).getProductById(id);
};