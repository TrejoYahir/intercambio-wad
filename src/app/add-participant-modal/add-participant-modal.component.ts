import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {BsModalRef} from 'ngx-bootstrap';
import {FriendService} from '../../services/friend.service';
import {UserService} from '../../services/user.service';
import {ExchangeService} from '../../services/exchange.service';

@Component({
  selector: 'app-add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrls: ['./add-participant-modal.component.scss']
})
export class AddParticipantModalComponent implements OnInit, OnDestroy {

  public keyword: string;
  public searchResults: User[];
  private readonly friendList: User[];
  private participantList: User[];
  private idExchange: number;

  constructor(public bsModalRef: BsModalRef, private friendService: FriendService, private userService: UserService, private exchangeService: ExchangeService) {
    this.searchResults = [];
    this.friendList = Object.assign([], this.friendService.friendList);
    console.log("friendlist", this.friendList);
  }

  ngOnInit() {
    console.log('participant list modal', this.participantList);
  }

  ngOnDestroy() {
    for(let friend of this.friendList) {
      delete friend.acceptInvite;
      delete friend.isParticipant;
    }
  }

  onAddParticipant(user: User) {
    console.log("user", user);
    let data = {...user};
    user.loading = true;
    data.idExchange = this.idExchange;
    this.exchangeService.addParticipant(data)
      .subscribe((data: any)=>{
        delete  user.loading;
        console.log(data);
        if(data.success) {
          user.isParticipant = true;
          this.participantList.push(user);
        }
        console.log("data", data);
      }, (error: any)=>{
        delete user.loading;
        console.log("error", error);
      });
  }

  onSearchUser() {
    if(this.keyword && this.keyword.trim() !== "") {
      let list = Object.assign([], this.friendList);
      this.searchResults = list.filter(x => {
        return x.alias && x.alias.toLowerCase().includes(this.keyword)
            || x.firstName.toLowerCase().includes(this.keyword)
            || x.lastName.toLowerCase().includes(this.keyword)
            || x.email.toLowerCase().includes(this.keyword);
      });
    } else {
      this.searchResults = [];
    }
  }

  isParticipant(user: User) {
    let sharedList: boolean = false;
    for(let participant of this.participantList) {
      if(participant.id === user.id) {
        user.acceptInvite = participant.acceptInvite;
        sharedList = true;
        break;
      }
    }
    return sharedList || user.isParticipant;
  }

}
