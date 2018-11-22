import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {InviteService} from '../../services/invite.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-exchange-invite',
  templateUrl: './exchange-invite.component.html',
  styleUrls: ['./exchange-invite.component.scss']
})
export class ExchangeInviteComponent implements OnInit {

  private code: string;
  public exchange: any;
  public pairList: any[][];
  public participantList: User[];
  public user: User;
  public isParticipant: boolean = false;
  public participantEntity: any;
  public exchangeBuddy: any;
  public canSignIn: boolean = false;
  public pastDate: boolean = false;
  private confirmModal: BsModalRef;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: BsModalService, private inviteService: InviteService, private authService: AuthService) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    this.route.queryParamMap
      .subscribe((params: any) => {
          const id = params.get("id");
          this.fetchExchange(id);
      });
  }

  fetchExchange(id: number) {
    this.inviteService.fetchExchangeInvite(id, this.code)
      .subscribe((data: any)=> {
        console.log(data);
        if(data[0].success) {
          this.exchange = JSON.parse(data[0].exchange);
          this.user = JSON.parse(data[2].user);
          this.participantList = this.exchange.participantList;
          this.pairList = this.buildPairList(data[1]);
          this.checkAccess();
        } else {
          console.log("navigating out on fetchExchange");
          this.router.navigate(["/dashboard/home"]);
        }
      }, (error: any)=>{
        console.log(error);
      });
  }

  checkAccess() {

    for(let participant of this.participantList) {
      if(participant.id === this.user.id) {
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

  setExchangeBuddy() {
    for(let i = 0; i<this.pairList.length; i++) {
      if(this.pairList[i][0].id == this.participantEntity.id) {
        this.exchangeBuddy = this.pairList[i][1];
      }
    }
    console.log("Exchange buddy", this.exchangeBuddy)
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
      this.canSignIn = true;
      this.pastDate = false;
    } else {
      this.canSignIn = false;
      this.pastDate = true;
    }
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

  setStatus() {
    let data = {...this.participantEntity};
    data.idExchange = this.exchange.id;
    this.inviteService.joinExchange(data)
      .subscribe((data: any) => {
        this.canSignIn = false;
        console.log(data);
        if(data.success) {
          this.participantEntity.acceptInvite = true;
        }
      }, (error: any)=>{
        console.log(error);
      });
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
    this.inviteService.leaveExchange(data)
      .subscribe((data: any) => {
        console.log(data);
        this.participantEntity.acceptInvite = false;
        this.checkSubscribed();
      }, (error: any)=>{
        console.log(error);
      });
  }

}
