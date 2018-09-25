import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = true;
  public exchange: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  goToExchange() {
    this.router.navigate(['/dashboard/exchange', this.exchange]);
  }

  logout() {
    this.authService.logout();
  }

}
