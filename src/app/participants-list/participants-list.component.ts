import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ExchangeService} from '../../services/exchange.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AddFriendModalComponent} from '../add-friend-modal/add-friend-modal.component';
import {AddParticipantModalComponent} from '../add-participant-modal/add-participant-modal.component';
import {Exchange} from '../../models/exchange.model';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {

  @Input() public participantList: User[];
  @Input() public isOwner: boolean = false;
  @Input() private exchange: Exchange;
  private addParticipantModal: BsModalRef;

  constructor(private exchangeService: ExchangeService, private modelService: BsModalService) { }

  ngOnInit() {

  }

  onAddParticipant() {
    this.addParticipantModal = this.modelService.show(AddParticipantModalComponent);
    this.addParticipantModal.content.participantList = this.participantList;
    this.addParticipantModal.content.idExchange = this.exchange.id;
  }

}
