import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { IProduct } from '../../interfaces/IProduct';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../data-access/cart.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCardComponent, ProductFiltersComponent, Paginator, RouterLink, SkeletonModule],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {

  protected readonly productService: ProductService = inject(ProductService);
  
  private readonly router: Router = inject(Router);

  protected readonly cartService: CartService = inject(CartService);

  protected readonly pageReportTemplate: string = 
  'Страница {currentPage} из {totalPages}, всего товаров: {totalRecords}';

  protected readonly skeletonItems: Signal<number[]> = computed(() =>
  Array.from({ length: this.productService.pageSize() }, (_, index) => index)
);

  onAddToCart(product: IProduct): void {
    this.cartService.add(product);
  }

  onOpen(product: IProduct): void {
    this.router.navigate(['/products', product.id]);
  }

  onPageChange(event: PaginatorState): void {
    const rows: number = event.rows ?? this.productService.pageSize();

    if (rows !== this.productService.pageSize()) {
      this.productService.setPageSize(rows);
    } else {
      this.productService.setPage((event.page ?? 0) + 1);
    }
  }

}