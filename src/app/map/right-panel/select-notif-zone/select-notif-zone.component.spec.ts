import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNotifZoneComponent } from './select-notif-zone.component';

describe('SelectNotifZoneComponent', () => {
  let component: SelectNotifZoneComponent;
  let fixture: ComponentFixture<SelectNotifZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectNotifZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNotifZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
