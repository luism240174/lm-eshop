import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@lm/orders';
import { ProductsService } from '@lm/products';
import { UsersService } from '@lm/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endsubs$))
    .subscribe( (values) => {
      this.statistics = values;
    }
    )
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }


}
