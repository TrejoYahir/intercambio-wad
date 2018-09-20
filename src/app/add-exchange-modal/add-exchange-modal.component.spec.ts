import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExchangeModalComponent } from './add-exchange-modal.component';

describe('AddExchangeModalComponent', () => {
  let component: AddExchangeModalComponent;
  let fixture: ComponentFixture<AddExchangeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExchangeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExchangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
