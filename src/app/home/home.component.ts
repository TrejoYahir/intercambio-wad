import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddExchangeModalComponent} from '../add-exchange-modal/add-exchange-modal.component';
import {AddFriendModalComponent} from '../add-friend-modal/add-friend-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {User} from '../../models/user.model';
import {Exchange} from '../../models/exchange.model';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {Subscription} from 'rxjs';
import {ExchangeService} from '../../services/exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public addExchangeModal: BsModalRef;
  public addFriendModal: BsModalRef;
  public confirmDeleteModal: BsModalRef;
  public exchangeList: Exchange[];
  private exchangeListSubscription: Subscription;
  private inviteListSubscription: Subscription;
  public inviteList: Exchange[];

  constructor(private modalService: BsModalService, private exchangeService: ExchangeService) {
    this.exchangeListSubscription = this.exchangeService.getExchangeList()
      .subscribe((exchangeList: Exchange[]) => {
        this.exchangeList = exchangeList;
        console.log("exchange list home", this.exchangeList);
      });

    this.inviteListSubscription = this.exchangeService.getInviteList()
      .subscribe((inviteList: Exchange[]) => {
        this.inviteList = inviteList;
        console.log("invite list home", this.inviteList);
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.exchangeListSubscription.unsubscribe();
    this.inviteListSubscription.unsubscribe();
  }

  onAddExchange(exchangeList: Exchange[]) {
    this.addExchangeModal = this.modalService.show(AddExchangeModalComponent, {keyboard: true});
    this.addExchangeModal.content.exchangeList = exchangeList;
  }

  onAddFriend(friendList: User[]) {
    this.addFriendModal = this.modalService.show(AddFriendModalComponent, {keyboard: true});
    this.addFriendModal.content.friendList = friendList;
  }

  onDeleteExchange(exchange: Exchange) {
    this.confirmDeleteModal = this.modalService.show(ConfirmModalComponent);
    this.confirmDeleteModal.content.text = "¿Seguro que desear eliminar este intercambio?";
    this.confirmDeleteModal.content.actionButton = "Eliminar";
    this.confirmDeleteModal.content.declineButton= "Cancelar";
    this.confirmDeleteModal.content.onClose.subscribe((result: boolean) => {
      if(result) {
        this.deleteHandler(exchange);
      }
    });
  }

  deleteHandler(exchange: Exchange) {
    this.exchangeService.deleteExchange(exchange.id)
      .subscribe((data: any)=>{
        console.log(data)
          if(data.success) {
            this.exchangeList = this.exchangeList.filter(x => x.id != exchange.id);
          } else {
            alert("Error al eliminar el intercambio")
          }
        }, (error: any)=>{
        console.log(error);
      });
  }

  onEditExchange(exchangeList: Exchange) {

  }

}
