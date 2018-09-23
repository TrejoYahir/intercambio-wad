import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantModalComponent } from './add-participant-modal.component';

describe('AddParticipantModalComponent', () => {
  let component: AddParticipantModalComponent;
  let fixture: ComponentFixture<AddParticipantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
