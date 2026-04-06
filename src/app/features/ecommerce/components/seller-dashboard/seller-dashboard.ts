import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-dashboard.html',
  styleUrls: ['./seller-dashboard.scss']
})
export class SellerDashboard implements OnInit {
  products = signal<Product[]>([]);
  
  productCategories: string[] = [
  'CRICKET',
  'TENNIS',
  'FOOTBALL',
  'BADMINTON',
  'HOCKEY',
  'SWIMMING'
];

  newProduct: WritableSignal<Product> = signal({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '', // Base64
    rating: 0,
    category: ''
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products.set(res.content);
    });
  }

  // Update newProduct safely
  updateNewProductField(field: keyof Product, value: any) {
    this.newProduct.update(p => ({ ...p, [field]: value }));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.updateNewProductField('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
  this.productService.createProduct(this.newProduct()).subscribe(() => {
    this.loadProducts();
    this.newProduct.set({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      rating: 0,
      category: ''
    });

    // SweetAlert2 success popup
    Swal.fire({
      title: 'Success!',
      text: 'Product has been added successfully 🎉',
      icon: 'success',
      confirmButtonColor: '#0f172a',
      confirmButtonText: 'OK'
    });
  }, error => {
    // SweetAlert2 error popup
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong while adding the product.',
      icon: 'error',
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Try Again'
    });
  });
}


deleteProduct(id: number | undefined) {
  if (id) {
    // Show confirmation popup
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0f172a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.loadProducts();

          // Success alert
          Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#0f172a'
          });
        }, error => {
          // Error alert
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting the product.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        });
      }
    });
  }
}
}