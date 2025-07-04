import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Product } from '../../common/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

ngOnInit(): void {
this.route.paramMap.subscribe(() => {
this.handleProductDetails();
})
}

handleProductDetails() {
// get the "id" param string. convert string to a number using the "+" symbol
const theProductId: number = +this.route.snapshot.paramMap.get('id');
this.productService.getProduct(theProductId).subscribe(
data => {
this.product = data;
}
)
}

addToCart() {
console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
const theCartItem = new CartItem(this.product);
this.cartService.addToCart(theCartItem);
}

}
