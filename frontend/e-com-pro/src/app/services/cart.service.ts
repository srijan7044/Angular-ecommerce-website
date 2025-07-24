import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private readonly cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  // Add product to cart
  addItem(product: any): void {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    this.updateCartCount();
  }

  // Get all items in the cart
  getItems(): CartItem[] {
    return this.items;
  }

  // Remove an item by ID
  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.updateCartCount();
  }
   decreaseItem(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeItem(id);
      }
      this.updateCartCount();
    }
  }

  // Clear the entire cart
  clearCart(): void {
    this.items = [];
    this.updateCartCount();
  }

  // Get total price
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Get total item quantity
  private updateCartCount(): void {
    const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(totalQuantity);
  }
}
