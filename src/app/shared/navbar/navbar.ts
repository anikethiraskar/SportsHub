import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../features/ecommerce/services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
// cartCount = 0;

  constructor(private router: Router, public cartService: CartService) {}

  // loadCartCount() {
  //   this.cartService.getCart().subscribe((cart: any) => {
  //     this.cartCount = cart.items ? cart.items.length : 0;
  //   });
  // }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
