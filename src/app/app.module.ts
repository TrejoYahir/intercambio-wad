import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddExchangeComponent } from './add-exchange/add-exchange.component';
import { ExchangeListComponent } from './exchange-list/exchange-list.component';
import { ExchangePageComponent } from './exchange-page/exchange-page.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FooterComponent} from './ui/footer/footer.component';
import {HeaderComponent} from './ui/header/header.component';
import {LayoutComponent} from './ui/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddExchangeComponent,
    ExchangeListComponent,
    ExchangePageComponent,
    FriendListComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
