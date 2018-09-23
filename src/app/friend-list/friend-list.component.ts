import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit, OnDestroy {

  @Output() public addFriend: EventEmitter<User[]> = new EventEmitter<User[]>();
  public friendList: any[] = [];
  private friendListSubscription: Subscription;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.friendListSubscription = this.friendService.getFriendList()
      .subscribe((data: User[]) => this.friendList = data);
  }

  ngOnDestroy() {
    this.friendListSubscription.unsubscribe();
  }

  onAddFriend() {
    this.addFriend.emit(this.friendList);
  }

}
