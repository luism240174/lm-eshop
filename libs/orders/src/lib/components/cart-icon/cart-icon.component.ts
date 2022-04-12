import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styles: []
})
export class CartIconComponent implements OnInit {
    cartCount: any = 0;

    constructor(private cartService: CartService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe(
            (cart) => {
                this.cartCount = cart?.items?.length ?? 0;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Cart was updated`
                });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Item was not added' });
            }
        );
    }
}
