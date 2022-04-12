import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { OrdersService } from '../../services/orders.service';
import { UsersService } from '@lm/users';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId: string;
    countries = [];
    unsubscribe$: Subject<any> = new Subject();

    ngOnInit(): void {
        this._getCartItems();
        this._getCountries();
        this._initCheckoutForm();
        this._autoFillUserData();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            street: ['', [Validators.required]],
            apartment: ['', [Validators.required]],
            zip: ['', [Validators.required]]
        });
    }

    private _autoFillUserData() {
        this.usersService
            .observeCurrentUser()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
                if (user) {
                    this.userId = user.id;
                    this.checkoutForm.name.setValue(user.name);
                    this.checkoutForm.email.setValue(user.email);
                    this.checkoutForm.phone.setValue(user.phone);
                    this.checkoutForm.street.setValue(user.street);
                    this.checkoutForm.apartment.setValue(user.apartment);
                    this.checkoutForm.zip.setValue(user.zip);
                    this.checkoutForm.city.setValue(user.city);
                    this.checkoutForm.country.setValue(user.country);
                }
            });
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productid,
                quantity: item.quantity
            };
        });
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    backToCart() {
        this.router.navigate(['/cart']);
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAdress1: this.checkoutForm.street.value,
            shippingAdress2: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            zip: this.checkoutForm.zip.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };

        this.ordersService.cacheOrderData(order);

        this.ordersService.createCheckoutSession(this.orderItems).subscribe((error) => {
            if (error) {
                console.log('error in redirect to payment');
            }
        });
    }
}
