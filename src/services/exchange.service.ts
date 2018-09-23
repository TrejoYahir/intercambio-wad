import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Exchange} from '../models/exchange.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private _exchangeList: BehaviorSubject<Exchange[]>;
  private _inviteList: BehaviorSubject<Exchange[]>;

  constructor(private http: HttpClient, private userService: UserService) {
    this._exchangeList = new BehaviorSubject<Exchange[]>([]);
    this._inviteList = new BehaviorSubject<Exchange[]>([]);

    this.fetchExchangeLists(this.userService.user.id)
      .subscribe((data: any)=>{
        console.log("exchange service data", data)
        this._exchangeList.next(data[0]);
        console.log("exchange list service", this._exchangeList.value);
        this._inviteList.next(data[1]);
        console.log("invite list service", this._inviteList.value);
      }, (error: any)=>{
        console.log(error);
      });
  }

  public setExchangeList(exchangeList: Exchange[]) {
    this._exchangeList.next(exchangeList);
  }

  public getExchangeList(): Observable<Exchange[]> {
    return this._exchangeList.asObservable();
  }

  public getInviteList(): Observable<Exchange[]> {
    return this._inviteList.asObservable();
  }

  public addExchange(exchange: Exchange) {
    return this.http.post('/add-exchange', exchange);
  }

  public fetchExchangeLists(id: number) {
    let exchanges = this.http.get(`/exchange-list?id=${id}`);
    let invites = this.http.get(`/get-invites?id=${id}`);
    return forkJoin([exchanges, invites]);
  }

  public fetchExchange(code: string) {
    let exchange = this.http.get(`/get-exchange?code=${code}`);
    let pairs = this.http.get(`/get-pairs?code=${code}`);
    return forkJoin([exchange, pairs]);
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

  public deleteExchange(id: number) {
    return this.http.get(`/delete-exchange?id=${id}`);
  }

  public editExchange(exchange: Exchange) {
    return this.http.post('/edit-exchange', exchange);
  }

  public addParticipant(participant: User) {
    return this.http.post('/add-participant', participant);
  }

  public savePairs(pairs: number[][], idExchange: number) {
    return this.http.post(`/save-pairs?id=${idExchange}`, pairs);
  }

  public deletePairs(idExchange: number) {
    return this.http.get(`/delete-pairs?id=${idExchange}`);
  }

}
