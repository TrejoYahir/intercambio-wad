import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post("/auth", user);
  }
}
