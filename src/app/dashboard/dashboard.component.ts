import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {AddExchangeModalComponent} from '../add-exchange-modal/add-exchange-modal.component';
import {AddFriendModalComponent} from '../add-friend-modal/add-friend-modal.component';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: BsModalService, private userService: UserService) { }

  public exchangeList: any[] = [];
  public friendList: any[] = [];
  public addExchangeModal: BsModalRef;
  public addFriendModal: BsModalRef;
  public user: User;

  ngOnInit() {
    this.user = this.userService.user;
  }

  onAddExchange() {
    this.addExchangeModal = this.modalService.show(AddExchangeModalComponent, {keyboard: true});
  }

  onAddFriend() {
    this.addFriendModal = this.modalService.show(AddFriendModalComponent, {keyboard: true});
  }

}
