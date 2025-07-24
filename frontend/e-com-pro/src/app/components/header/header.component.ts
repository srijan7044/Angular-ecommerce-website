import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CartService, CartItem } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../../services/serchService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  isLoginPage = false;
  isAuthenticated = false;
  isDropdownOpen = false;
  isCartOpen = false;
  isSeller = false;
  showSellerForm = false;
  showAddProductPopup = false;
  cartItemCount = 0;
  cartItems: CartItem[] = [];
  total = 0;
  searchValue = '';

  private readonly destroy$ = new Subject<void>();

  newProduct = {
    name: '',
    price: null,
    description: '',
    category: '',
    image: ''
  };

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly searchService: SearchService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.urlAfterRedirects === '/login';
    });
  }

  ngOnInit() {
    this.authService.authStatus.pipe(takeUntil(this.destroy$))
      .subscribe(status => this.isAuthenticated = status);

    this.cartService.cartCount$.pipe(takeUntil(this.destroy$))
      .subscribe(count => this.cartItemCount = count);

    this.loadCart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

    onSearch() {
      console.log(this.searchValue);
    this.searchService.setSearchTerm(this.searchValue);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  profileBtnClick() {
    this.router.navigate(['/profile']);
  }

  navigate() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  increaseQuantity(item: CartItem) {
    this.cartService.addItem(item);
    this.loadCart();
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseItem(item.id);
    this.loadCart();
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  sellerButtonClick() {
    this.showSellerForm = !this.showSellerForm;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.newProduct.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addProduct() {
    console.log(this);
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.description || !this.newProduct.category || !this.newProduct.image) {
      alert("❗ Please fill all fields");
      return;
    }

    this.http.post('http://localhost:5000/api/products', this.newProduct).subscribe({
      next: (res) => {
        console.log('✅ Product added:', res);
        alert('✅ Product added successfully!');
        this.resetProductForm();
      },
      error: (err) => {
        console.error('❌ Upload failed:', err);
        alert('❌ Failed to upload product');
      }
    });
  }

  resetProductForm() {
    this.showAddProductPopup = false;
    this.newProduct = {
      name: '',
      price: null,
      description: '',
      category: '',
      image: ''
    };
  }
}
