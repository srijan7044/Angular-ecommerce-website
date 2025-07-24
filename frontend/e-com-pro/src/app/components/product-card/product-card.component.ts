import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;

  @Output() addToCart = new EventEmitter<any>();
  @Output() buyNow = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>(); // added remove emitter

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  onBuyNow() {
    this.buyNow.emit(this.product);
  }

  onRemove() {
    this.remove.emit(this.product); // trigger remove event to parent
  }
}
