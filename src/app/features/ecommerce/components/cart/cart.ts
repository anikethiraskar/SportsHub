import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {

  cart: any;
  cartItems: any[] = [];
  cartTotal = 0;

  constructor(private cartService: CartService,
     private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  console.log("Cart component loaded");
  this.loadCart();
}
  loadCart(): void {
  this.cartService.getCart().subscribe({
    next: (cart) => {

      this.cart = cart;
      this.cartItems = cart.items || [];

      this.calculateTotal();

      this.cd.detectChanges();   // FIXES the Angular error
    },
    error: (err) => console.error(err)
  });
}

  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  updateQuantity(item: any, change: number): void {
    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      this.removeItem(item);
      return;
    }

    this.cartService.addToCart(item.product, change).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item.product.productId).subscribe(() => {
      this.loadCart();
    });
  }

}