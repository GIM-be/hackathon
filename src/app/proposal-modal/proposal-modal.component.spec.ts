import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalModalComponent } from './proposal-modal.component';

describe('ProposalModalComponent', () => {
  let component: ProposalModalComponent;
  let fixture: ComponentFixture<ProposalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
