export interface Product {
  productId?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  rating: number;
  brandName?: any; // optional, you can map Brand model
  category: string;
  createdAt?: string;
}
