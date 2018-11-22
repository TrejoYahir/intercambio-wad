import { Injectable } from '@angular/core';
import {forkJoin} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  public fetchExchangeInvite(id: number, code: string) {
    let exchange = this.http.get(`/get-exchange?code=${code}`);
    let pairs = this.http.get(`/get-pairs?code=${code}`);
    let user = this.http.get(`/get-user?id=${id}`);
    return forkJoin([exchange, pairs, user]);
  }

  public search(id: number) {
    return this.http.get(`/search-exchange?id=${id}`);
  }

  public joinExchange(participant: User) {
    return this.http.post('/join-exchange', participant);
  }

  public leaveExchange(participant: User) {
    return this.http.post('/leave-exchange', participant);
  }

  public selectExchangeTheme(theme: any, user: number, exchange: number) {
    return this.http.get('/select-theme?theme=' + theme + '&user=' + user + '&exchange=' + exchange);
  }
}
