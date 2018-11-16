import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ExchangePageComponent} from './exchange-page/exchange-page.component';
import {ExchangeListComponent} from './exchange-list/exchange-list.component';
import {SignupComponent} from './signup/signup.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../guards/auth-gard.service';
import {LoggedGuard} from '../guards/logged-guard.service';
import {AppModule} from './app.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [LoggedGuard]},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {path: 'home', component: HomeComponent},
        {path: 'exchanges', component: ExchangeListComponent},
        {path: 'exchange/:code', component: ExchangePageComponent},
        {path: 'friends', component: FriendListComponent},
      ]
    }]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ]
})
export class AppRoutingModule { }
