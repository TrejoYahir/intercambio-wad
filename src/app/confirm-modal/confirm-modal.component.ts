import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public text: string;
  public actionButton: string;
  public declineButton: string;
  public onClose: Subject<boolean>;
  public enableDecline: boolean = true;

  constructor(public _bsModalRef: BsModalRef) { }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  public onDecline(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

}
