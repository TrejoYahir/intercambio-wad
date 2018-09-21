import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.scss']
})
export class ExchangePageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public id: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
