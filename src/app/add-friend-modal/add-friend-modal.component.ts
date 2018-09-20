import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.scss']
})
export class AddFriendModalComponent implements OnInit {

  public keyword: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onAddFriend() {

  }

  onSearchUser() {

  }

}
