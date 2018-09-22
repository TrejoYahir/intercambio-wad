import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user: User = {
    alias: "",
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    passConfirm: ""
  };

  public requestError: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit(form: any) {
    this.requestError = null;
    let data = {...this.user};
    delete data.passConfirm;

    console.log("form", form);
    if(form.valid)
      this.authService.signup(data)
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
