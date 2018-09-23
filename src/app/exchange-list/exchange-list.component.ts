import {Component, OnInit, Output, EventEmitter, OnDestroy, Input} from '@angular/core';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {ExchangeService} from '../../services/exchange.service';
import {Exchange} from '../../models/exchange.model';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {

  @Output() public addExchange: EventEmitter<Exchange[]> = new EventEmitter<Exchange[]>();
  @Output() public editExchange: EventEmitter<Exchange> = new EventEmitter<Exchange>();
  @Output() public deleteExchange: EventEmitter<Exchange> = new EventEmitter<Exchange>();

  @Input() public title: string;
  @Input() public exchangeList: Exchange[];
  @Input() public canEdit: boolean = false;
  @Input() public notAvailableText: string;

  constructor() {}

  ngOnInit() {}

  onAddExchange() {
    this.addExchange.emit(this.exchangeList);
  }

  onDeleteExchange(exchange) {
    this.deleteExchange.emit(exchange);
  }

  onEditExchange(exchange) {
    this.editExchange.emit(exchange);
  }

}
