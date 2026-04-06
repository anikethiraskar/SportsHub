import { Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/api/carts';
  private userId = 1; // temporary until login system

  cartCount = signal<number>(0);

  constructor(private http: HttpClient) {}

  // Get cart of user
  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.userId}`).pipe(
      tap((cart: any) => {
        this.cartCount.set(cart.items ? cart.items.length : 0);
      })
    );
    
  }

  // Add product to cart
  addToCart(product: Product, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.userId}/add`, {
      productId: product.productId,
      quantity: quantity
    }).pipe(tap((cart: any) => {
        this.cartCount.set(cart.items ? cart.items.length : 0);
      })
    );
  }

  // Remove product from cart
  removeFromCart(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.userId}/remove`, {
      productId: productId
    }).pipe(tap((cart: any) => {
        this.cartCount.set(cart.items ? cart.items.length : 0);
      })
    );
  }

  // Clear cart
  clearCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.userId}/clear`, {}).pipe(tap(() => {
      this.cartCount.set(0);
    }));
  }

}