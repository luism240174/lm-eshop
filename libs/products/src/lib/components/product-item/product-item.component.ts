import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@lm/orders';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent {
    @Input() product: Product;

    constructor(private cartService: CartService) {}

    addProductToCart() {
        const cartItem: CartItem = {
            productid: this.product.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
    }
}
