import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@lm/users';

export const routes: Routes = [
  {
    path:'cart',
    component: CartPageComponent
  },
  {
    path:'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path:'success',
    component: ThankYouComponent
  }
];

@NgModule({
    imports: [CommonModule, 
              RouterModule.forChild(routes),
              ReactiveFormsModule,
              FormsModule,
              BadgeModule,
              ButtonModule,
              DropdownModule,
              InputMaskModule,
              InputNumberModule,
              InputTextModule, 
              ToastModule
            ],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    providers: [
      MessageService
    ]
})
export class OrdersModule {

    constructor( cartService: CartService ){

        cartService.initCartLocalStorage();
    }

}
