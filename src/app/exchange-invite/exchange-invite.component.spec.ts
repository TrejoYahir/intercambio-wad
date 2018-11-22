import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeInviteComponent } from './exchange-invite.component';

describe('ExchangeInviteComponent', () => {
  let component: ExchangeInviteComponent;
  let fixture: ComponentFixture<ExchangeInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
