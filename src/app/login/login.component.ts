import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {
    email: "",
    pass: "",
  };

  requestError: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this.requestError = null;
    let data = {...this.user};

    console.log("form", form);
    if(form.valid)
      this.authService.login(data)
        .subscribe((response: any) => {
          console.log("data", response);
          this.handleResponse(response);
        }, (error: any) => {
          this.requestError = "Ocurrió un error con el servidor";
          console.log("error", error);
        });
  }

  handleResponse(response: any) {
    if(response.success) {
      const user: User = JSON.parse(response.user);
      this.authService.saveSession(user);
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "/dashboard/home";
      this.router.navigate([redirect]);
    } else {
      this.requestError = response.message;
    }
  }

}
