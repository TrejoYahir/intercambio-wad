import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Friendship} from '../models/friendship.model';
import {User} from '../models/user.model';
import {UserService} from './user.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private _friendListSubject: BehaviorSubject<User[]>;


  constructor(private http: HttpClient, private userService: UserService) {
    this._friendListSubject = new BehaviorSubject<User[]>([]);
    this.fetchFriendList(this.userService.user.id)
      .subscribe((data: any)=>{
        this._friendListSubject.next(data);
      }, (error: any)=>{
        console.log(error);
      });
  }

  get friendList() {
    return this._friendListSubject.getValue();
  }

  search(keyword: string) {
    return this.http.get(`/search-user?keyword=${keyword}`);
  }

  addFriend(friendship: Friendship) {
    return this.http.post('/add-friend', friendship);
  }

  addExternalFriend(externalFriend: any, id: number) {
    return this.http.post(`/add-external-friend?id=${id}`, externalFriend);
  }

  fetchFriendList(id: number) {
    return this.http.get(`/friend-list?id=${id}`);
  }

  setFriendList(friendList: User[]) {
    this._friendListSubject.next(friendList);
  }

  getFriendList(): Observable<User[]> {
    return this._friendListSubject.asObservable();
  }

}
