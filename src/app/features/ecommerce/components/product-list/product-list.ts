import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { CommonModule, NgForOf} from '@angular/common';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgForOf,FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit {
  products = signal<Product[]>([]);
  page = 0;
  size = 10;
  totalPages = 0;

  // ✅ filters signal
  filters: WritableSignal<{ brand: string; category: string; minPrice: number; maxPrice: number }> =
    signal({
      brand: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000
    });

  // For dropdown options
  brands = signal<string[]>(['Nike', 'Adidas', 'Puma', 'Reebok']);
  categories = signal<string[]>(['Shoes', 'Clothing', 'Accessories']);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page: number = 0): void {
    this.productService.getAllProducts(page, this.size).subscribe({
      next: (res) => {
        console.log('✅ API Response in Angular:', res);
        this.products.set(res.content);
        this.page = res.page;
        this.totalPages = res.totalPages;

        const allBrands = Array.from(new Set(res.content.map(p => p.brandName)));
        const allCategories = Array.from(new Set(res.content.map(p => p.category)));
        this.brands.set(allBrands);
        this.categories.set(allCategories);
      },
      error: (err) => {
        console.error('❌ API Error:', err);
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.loadProducts(this.page + 1);
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.loadProducts(this.page - 1);
    }
  }

  // ✅ Fixed: added return type
  updateFilter(field: keyof { brand: string; category: string; minPrice: number; maxPrice: number }, value: any): void {
    this.filters.set({
      ...this.filters(),
      [field]: value
    });
  }

  // Apply filter logic
  get filteredProducts(): Product[] {
    const f = this.filters();
    return this.products().filter(p =>
      (!f.brand || p.brandName === f.brand) &&
      (!f.category || p.category === f.category) &&
      (p.price >= f.minPrice && p.price <= f.maxPrice)
    );
  }
  applyFilters(): Product[] {
  return this.filteredProducts;
}
clearFilters(): void {
  this.filters.set({
    brand: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000
  });
  this.loadProducts(this.page); // reload current page
}

addToCart(product: Product): void {
  console.log('Added to cart:', product);
  // Implement actual cart logic here
}


}
