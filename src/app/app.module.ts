import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AuthService} from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ExchangeListComponent } from './exchange-list/exchange-list.component';
import { ExchangePageComponent } from './exchange-page/exchange-page.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { SignupComponent } from './signup/signup.component';
import { AddExchangeModalComponent } from './add-exchange-modal/add-exchange-modal.component';
import { AddFriendModalComponent } from './add-friend-modal/add-friend-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { LayoutComponent } from './ui/layout/layout.component';
import {CollapseModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { ParticipantsListComponent } from './participants-list/participants-list.component';
import { MatchPasswordDirective } from '../directives/match-password.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServerHttpInterceptor} from '../interceptors/server.interceptor';
import {AuthGuard} from '../guards/auth-gard.service';
import {LoggedGuard} from '../guards/logged-guard.service';

export function onInit(authService: AuthService) {
  return () => authService.getSavedSession();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ExchangeListComponent,
    ExchangePageComponent,
    AddExchangeModalComponent,
    AddFriendModalComponent,
    FriendListComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    ParticipantsListComponent,
    MatchPasswordDirective,
  ],
  entryComponents: [
    AddExchangeModalComponent,
    AddFriendModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoggedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerHttpInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: onInit,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
