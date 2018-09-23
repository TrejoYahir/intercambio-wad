import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Exchange} from '../../models/exchange.model';
import {ExchangeService} from '../../services/exchange.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.scss']
})
export class ExchangePageComponent implements OnInit {

  public exchange: Exchange = {
    exchangeName: "",
    maxAmount: null,
    exchangeDescription: "",
    exchangeDate: "",
    limitDate: "",
    giftThemes: [],
    participantList: [],
    idCreator: null
  };

  public participantList: User[];

  public isOwner: boolean = false;
  public isParticipant: boolean = false;
  public participantEntity: User;
  private confirmModal: BsModalRef;
  private messageModal: BsModalRef;

  constructor(private route: ActivatedRoute, private exchangeService: ExchangeService, private router: Router, private userService: UserService, private modalService: BsModalService) { }

  public code: string;

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    this.fetchExchange();
  }

  checkAccess() {
    if(!this.isOwner) {
      console.log(this.userService.user);
      for(let participant of this.participantList) {
        console.log(participant);
        if(participant.id == this.userService.user.id) {
          this.isParticipant = true;
          this.participantEntity = participant;
          this.checkSubscribed();
          return;
        }
      }

      if(!this.isParticipant) {
        console.log("navigating out on checkAccess");
        this.router.navigate(["/dashboard/home"]);
      }
    }
  }

  fetchExchange() {
    this.exchangeService.fetchExchange(this.code)
      .subscribe((data: any)=> {
        if(data.success) {
          this.exchange = JSON.parse(data.exchange);
          this.participantList = this.exchange.participantList;
          this.isOwner = this.checkOwnerShip();
          console.log(this.exchange);
          this.checkAccess();
        } else {
          console.log("navigating out on fetchExchange");
          this.router.navigate(["/dashboard/home"]);
        }
      }, (error: any)=>{
        console.log(error);
      });
  }

  checkOwnerShip() {
    return this.userService.user.id === this.exchange.idCreator;
  }

  checkSubscribed() {
    if(!this.participantEntity.acceptInvite) {
      this.checkDateAccess();
    }
  }

  checkDateAccess() {
    let today = new Date().setHours(0,0,0,0);
    let limitDate = new Date(`${this.exchange.limitDate}T00:00:00`).setHours(0,0,0,0);
    if(today <= limitDate) {
      this.askSubscription();
    } else {
      this.showDateLimitMessage();
    }
  }

  showDateLimitMessage() {
    this.confirmModal = this.modalService.show(ConfirmModalComponent);
    this.confirmModal.content.text = "La fecha limite para la incripción ya pasó";
    this.confirmModal.content.actionButton = "Aceptar";
    this.confirmModal.content.onClose.subscribe((result: boolean) => {
      this.router.navigate(["/dashboard/home"]);
    });
  }

  askSubscription() {
    this.confirmModal = this.modalService.show(ConfirmModalComponent);
    this.confirmModal.content.text = "¿Deseas unirte a este intercambio?";
    this.confirmModal.content.actionButton = "Unirme";
    this.confirmModal.content.declineButton = "Rechazar";
    this.confirmModal.content.onClose.subscribe((result: boolean) => {
      this.setStatus(result);
    });
  }

  setStatus(result: boolean) {
    if(result) {
      let data = {...this.participantEntity};
      data.idExchange = this.exchange.id;
      this.exchangeService.joinExchange(data)
        .subscribe((data: any) => {
          console.log(data);
          if(data.success) {
            this.participantEntity.acceptInvite = true;
          } else {
            console.log("navigating out on setStatus subscribe");
            this.router.navigate(["/dashboard/home"]);
          }
        }, (error: any)=>{
          console.log(error);
        });
    } else {
      console.log("navigating out on setStatus");
      this.router.navigate(["/dashboard/home"]);
    }
  }

  confirmUnsubscribe() {
    this.confirmModal = this.modalService.show(ConfirmModalComponent);
    this.confirmModal.content.text = "¿Abandonar intercambio?";
    this.confirmModal.content.actionButton = "Salir";
    this.confirmModal.content.declineButton = "Cancelar";
    this.confirmModal.content.onClose.subscribe((result: boolean) => {
      if(result) this.unsubscribe();
    });
  }

  unsubscribe() {
    let data = {...this.participantEntity};
    data.idExchange = this.exchange.id;
    this.exchangeService.leaveExchange(data)
      .subscribe((data: any) => {
        console.log(data);
        this.participantEntity.acceptInvite = false;
        this.router.navigate(["/dashboard/home"]);
      }, (error: any)=>{
        console.log(error);
      });
  }

  createPairs() {

  }

}
