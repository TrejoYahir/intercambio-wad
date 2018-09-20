import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {AddExchangeModalComponent} from '../add-exchange-modal/add-exchange-modal.component';
import {AddFriendModalComponent} from '../add-friend-modal/add-friend-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  exchangeList: any[] = [];
  friendList: any[] = [];
  addExchangeModal: BsModalRef;
  addFriendModal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  onAddExchange() {
    this.addExchangeModal = this.modalService.show(AddExchangeModalComponent, {keyboard: true});
  }

  onAddFriend() {
    this.addFriendModal = this.modalService.show(AddFriendModalComponent, {keyboard: true});
  }

}
