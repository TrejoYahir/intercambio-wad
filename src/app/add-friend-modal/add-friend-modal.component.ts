import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {User} from '../../models/user.model';
import {FriendService} from '../../services/friend.service';
import {UserService} from '../../services/user.service';
import {Friendship} from '../../models/friendship.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.scss']
})
export class AddFriendModalComponent implements OnInit {

  public keyword: string;
  public searchResults: User[];
  public loadingSearch: boolean = false;
  private friendList: User[];
  public showExternal: boolean = false;
  public externalMessage: string;

  constructor(public bsModalRef: BsModalRef, private friendService: FriendService, private userService: UserService) {
    this.searchResults = [];
  }

  ngOnInit() { }

  toggleAddExternal() {
    this.externalMessage = null;
    this.showExternal = !this.showExternal;
  }

  onSaveExternalFriend(email: string, fullName: string) {
    const externalFriend = {
      email: email,
      firstName: fullName.substr(0,fullName.indexOf(' ')),
      lastName: fullName.substr(fullName.indexOf(' ')+1)
    };
    console.log('data to send', externalFriend);
    this.friendService.addExternalFriend(externalFriend, this.userService.user.id)
      .subscribe((data: any)=>{
        this.showExternal = false;
        console.log("externalFriend received", data);
        if(data.success) {
          this.externalMessage = "Amigo agregado";
          this.friendList.push(JSON.parse(data.friend));
          this.friendService.setFriendList(this.friendList);
        } else {
          this.externalMessage = "Ocurrió un error al agregar amigo";
        }
        console.log("data", data);
      }, (error: any)=>{
        this.externalMessage = "Ocurrió un error al agregar amigo";
        console.log("error", error);
      });
  }

  onAddFriend(user: User) {
    const friendship: Friendship = {
      idUser1: this.userService.user.id,
      idUser2: user.id
    };
    console.log("friendship", friendship);
    user.loadingFriendship = true;
    this.friendService.addFriend(friendship)
      .subscribe((data: any)=>{
        delete user.loadingFriendship;
        if(data.success) {
          user.isFriend = true;
          this.friendList.push(JSON.parse(data.friend));
          this.friendService.setFriendList(this.friendList);
        }
        console.log("data", data);
      }, (error: any)=>{
        delete user.loadingFriendship;
        console.log("error", error);
      });
  }

  onSearchUser() {
    this.showExternal = false;
    this.externalMessage = null;
    if(this.keyword && this.keyword.trim() !== "") {
      this.loadingSearch = true;
      this.friendService.search(this.keyword)
        .subscribe((data: any)=>{
          console.log(data);
          this.loadingSearch = false;
          this.searchResults = data;
          this.searchResults = this.searchResults.filter(x => x.id != this.userService.user.id);
          for(let result of this.searchResults) {
            if(this.friendList.some(x =>x.id == result.id )) {
              result.isFriend = true;
            }
          }
        }, (error: any)=>{
          this.loadingSearch = false;
          console.log("error", error);
        });
    } else {
      this.searchResults = [];
    }
  }

}
