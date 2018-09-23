import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Exchange} from '../../models/exchange.model';
import {User} from '../../models/user.model';
import {FriendService} from '../../services/friend.service';
import {UserService} from '../../services/user.service';
import {ExchangeService} from '../../services/exchange.service';

@Component({
  selector: 'app-add-exchange-modal',
  templateUrl: './add-exchange-modal.component.html',
  styleUrls: ['./add-exchange-modal.component.scss']
})
export class AddExchangeModalComponent implements OnInit {

  public exchange: Exchange = {
    exchangeName: "",
    maxAmount: null,
    exchangeDescription: "",
    exchangeDate: "",
    limitDate: "",
    giftThemes: [],
    participants: [],
    idCreator: null
  };
  public friendList: User[];
  public exchangeList: Exchange[];
  public theme: string;
  public requestError: string;
  public today: string;

  constructor(public bsModalRef: BsModalRef, private friendService: FriendService, private userService: UserService, private exchangeService: ExchangeService) {
    this.friendList = this.friendService.friendList;
    this.today = new Date().setHours(0,0,0,0).toString();
    this.exchange.idCreator = this.userService.user.id;

    console.log("today", this.today)
  }

  ngOnInit() {
  }

  onAddTheme() {
    if(this.theme != null && this.theme.trim() != "") {
      this.exchange.giftThemes.push(this.theme);
      this.theme = "";
    }
  }

  onSubmit(form: any) {
    this.requestError = null;
    let data = {...this.exchange};
    console.log("exchange", data);
    console.log("form", form);
    if(form.valid && this.exchange.participants.length > 1 && this.exchange.giftThemes.length > 0)
      this.exchangeService.addExchange(data)
        .subscribe((data: any)=>{
          console.log(data);
          if(data.success) {
            this.exchangeList.push(JSON.parse(data.exchange));
            this.bsModalRef.hide()
          } else {
            this.requestError = data.message;
          }
        }, (error: any)=> {
          this.requestError = error.message;
          console.log(error);
        });
  }

  toggleSelectedFriend(friendId: number, checked: boolean) {
    if(checked) {
      this.exchange.participants.push(friendId);
    } else {
      this.exchange.participants = this.exchange.participants.filter(x => x != friendId);
    }
  }

  getExchangeLimitDate() {
    let d = this.exchange.limitDate;
    if(d !== null && d.trim() !== "")
      return new Date(d).getTime().toString();
    return null;
  }

}
