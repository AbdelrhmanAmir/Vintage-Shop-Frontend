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

  constructor(private productService:ProductService,private route:ActivatedRoute, private cartService:CartService){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductId:number=+this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product=data;
      }
      )
  }
  addToCart(theProduct:Product){
    const theCartIem = new CartItem(theProduct);
    this.cartService.addToCart(theCartIem);
  }

}
