import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/serchService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = res;
      },
      error: (err) => console.error('Error loading products:', err)
    });

    this.searchService.searchTerm$.subscribe(term => {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
  }
}
