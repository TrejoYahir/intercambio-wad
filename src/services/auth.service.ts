import {Injectable, Injector} from '@angular/core';
import { User } from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _logged: boolean = false;
  private _redirectUrl: string = null;

  constructor(private http: HttpClient, private userService: UserService, private injector: Injector) { }

  saveSession(user: User) {
    this._logged = true;
    this.userService.user = user;
  }

  set logged(state) {
    this._logged = state;
  }

  get logged() {
    return this._logged;
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }

  get redirectUrl() {
    return this._redirectUrl;
  }

  getSavedSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      const u: string = localStorage.getItem('user');
      if(u !== undefined) {
        this._logged = true;
        this.userService.user = JSON.parse(u);
      }
      resolve();
    });
  }

  signup(user: User): Observable<any> {
    return this.http.post("/signup", user);
  }

  login(user: any) {
    return this.http.post("/login", user);
  }

  logout() {
    /* DO NOT TOUCH THIS */
    const router = this.injector.get(Router)
    this._logged = false;
    this.userService.deleteUser();
    router.navigate(["/login"]);
  }

}
