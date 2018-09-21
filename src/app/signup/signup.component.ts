import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit(form: any) {
    console.log("form", form);
    if(form.valid)
      this.authService.signup(this.user)
        .subscribe((data: any) => {
          console.log("data", data);
        }, (error: any) => {
          console.log("error", error);
        });
  }

}
