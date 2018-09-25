import {Component, OnInit, ɵConsole} from '@angular/core';
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
  public pairList: any[][] = [];
  public exchangeBuddy: any[];

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
          if(this.pairList.length > 0) {
            this.setExchangeBuddy();
          }
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
        console.log(data);
        if(data[0].success) {
          this.exchange = JSON.parse(data[0].exchange);
          this.participantList = this.exchange.participantList;
          this.isOwner = this.checkOwnerShip();
          this.pairList = this.buildPairList(data[1]);
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

  setExchangeBuddy() {
    for(let i = 0; i<this.pairList.length; i++) {
      if(this.pairList[i][0].id == this.participantEntity.id) {
        this.exchangeBuddy = this.pairList[i][1];
      }
    }
    console.log("Exchange buddy", this.exchangeBuddy)
  }

  checkOwnerShip() {
    return this.userService.user.id === this.exchange.idCreator;
  }

  private buildPairList(pairs: any[][]) {
    let pairList: any[][];
    if(pairs.length == 0)
      return [];
    else {
      pairList = [];
      for(let i = 0; i<pairs.length; i++) {
        pairList[i] = [];
        for(let j = 0; j < pairs[i].length; j++) {
          if(pairList[i][j] == 0) {
            let participant: any = {};
            participant.firstName = "Sin asignar";
            participant.acceptInvite = true;
            participant.isInGroup = true;
            pairList[i][j] = participant;
          }
          else
            pairList[i][j] = this.participantList.find(x => pairs[i][j] == x.id);
        }
      }
    }
    console.log("pairlist", pairList);
    return pairList;
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
    let leftList: User[] = [...this.participantList];
    let rightList: User[] = [...this.participantList];

    let pairList: number[][] = [];

    let a, b, user1, user2;

    while(leftList.length > 0 && rightList.length > 0) {

      do {
        a = Math.floor(Math.random() * leftList.length);
        b = Math.floor(Math.random() * rightList.length);

        user1 = leftList[a];
        user2 = rightList[b];

      } while(user1.id == user2.id && rightList.length > 1 && leftList.length > 1);

      if(user1.id == user2.id && rightList.length == 1 && leftList.length == 1) {
        return this.createPairs();
      }

      leftList = leftList.filter(x => x.id != user1.id);
      rightList = rightList.filter(x => x.id != user2.id);

      pairList.push([user1.id,user2.id]);

    }

    console.log("pairs", pairList);
    this.exchangeService.savePairs(pairList, this.exchange.id)
      .subscribe((data: any) => {
        this.pairList = this.buildPairList(pairList);
        console.log(data);
      }, (error: any)=>{
        console.log(error);
        alert("Error al guardar sorteo");
      });
  }

  deletePairs() {
    this.exchangeService.deletePairs(this.exchange.id)
      .subscribe((data: any)=>{
        console.log(data);
        if(data.success) {
          this.pairList = [];
        } else {
          alert("Error al anular sorteo");
        }
      }, (error: any)=>{
        console.log(error);
        alert("Error al anular sorteo");
      });
  }

}
