import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { PaginatedResponse } from '../../../model/ProductPagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  // Paginated fetch
  getAllProducts(page = 0, size = 10): Observable<PaginatedResponse<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Product>>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  getFilteredProducts(filters: any, page = 0, size = 10): Observable<any> {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (filters.brand) params = params.set('brand', filters.brand);
  if (filters.category) params = params.set('category', filters.category);
  if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice);
  if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice);

  return this.http.get<any>(`${this.apiUrl}/filter`, { params });
}

}
