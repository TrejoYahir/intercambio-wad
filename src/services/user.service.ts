import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  constructor() { }

  set user(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this._user = user;
  }

  get user() {
    return this._user;
  }

  deleteUser() {
    this._user = null;
    localStorage.removeItem('user');
  }

  fetchUser(id: number) {

  }

}
