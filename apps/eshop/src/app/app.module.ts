import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { NgxStripeModule } from 'ngx-stripe';



import { ProductsModule } from '@lm/products';
import { OrdersModule } from '@lm/orders';
import { UiModule } from '@lm/ui';
import { JwtInterceptor, UsersModule } from '@lm/users';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';




const routes: Routes = [
    { path: '', component: HomePageComponent }
    
];

@NgModule({
    declarations: [
        AppComponent, 
        HomePageComponent, 
        HeaderComponent, 
        FooterComponent, 
        NavComponent],
        
    imports: [
        BrowserModule, 
        BrowserAnimationsModule, 
        RouterModule.forRoot(routes), 
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true
        }),
        AccordionModule,
        ProductsModule,
        OrdersModule,
        UiModule,
        UsersModule,
        NgxStripeModule.forRoot('pk_test_51KDzSmH9ZnMHFWhDeTCskRyflwwoH85FJBzYlKUTjLPImckl1sgD7qoedJQPDAsivc8f7YElq7EmlEP3Up4YYAcJ00z3V4CtGt')
        
        
        
    ],
    providers: [MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
