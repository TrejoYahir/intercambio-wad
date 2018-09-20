import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Exchange} from '../../models/exchange.model';

@Component({
  selector: 'app-add-exchange-modal',
  templateUrl: './add-exchange-modal.component.html',
  styleUrls: ['./add-exchange-modal.component.scss']
})
export class AddExchangeModalComponent implements OnInit {

  public exchange: Exchange = new Exchange();

  public theme: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onAddTheme() {
    this.exchange.giftThemes.push(this.theme);
  }

}
