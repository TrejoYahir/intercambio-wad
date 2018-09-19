import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {

  @Input() private exchangeList: any[];

  constructor() { }

  ngOnInit() {
  }

}
