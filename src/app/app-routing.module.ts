import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ExchangePageComponent} from './exchange-page/exchange-page.component';
import {ExchangeListComponent} from './exchange-list/exchange-list.component';
import {SignupComponent} from './signup/signup.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent ,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'exchanges', component: ExchangeListComponent },
      { path: 'exchange/:id', component: ExchangePageComponent },
      { path: 'friends', component: FriendListComponent },
    ]
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
