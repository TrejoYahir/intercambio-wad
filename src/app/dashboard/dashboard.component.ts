import {Component, OnDestroy, OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {AddExchangeModalComponent} from '../add-exchange-modal/add-exchange-modal.component';
import {AddFriendModalComponent} from '../add-friend-modal/add-friend-modal.component';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FriendService} from '../../services/friend.service';
import {Observable, Subscribable, Subscription} from 'rxjs';
import {Exchange} from '../../models/exchange.model';
import {ExchangeService} from '../../services/exchange.service';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private modalService: BsModalService, private userService: UserService, private friendService: FriendService, private exchangeService: ExchangeService) { }

  public exchangeList: Exchange[] = [];
  public friendList: User[] = [];
  private friendListSubscription: Subscription;
  private exchangeListSubscription: Subscription;
  public addExchangeModal: BsModalRef;
  public addFriendModal: BsModalRef;
  public user: User;

  ngOnInit() {
    this.user = this.userService.user;
    this.friendListSubscription = this.friendService.getFriendList()
      .subscribe((data: User[]) => this.friendList = data);
    this.exchangeListSubscription = this.exchangeService.getExchangeList()
      .subscribe((data: Exchange[]) => this.exchangeList = data);
  }

  ngOnDestroy() {
    this.friendListSubscription.unsubscribe();
    this.exchangeListSubscription.unsubscribe();
  }

  onAddExchange() {
    this.addExchangeModal = this.modalService.show(AddExchangeModalComponent, {keyboard: true});
    this.addExchangeModal.content.exchangeList = this.exchangeList;
  }

  onAddFriend() {
    this.addFriendModal = this.modalService.show(AddFriendModalComponent, {keyboard: true});
    this.addFriendModal.content.friendList = this.friendList;
  }

}
