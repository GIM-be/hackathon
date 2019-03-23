import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayermanagerComponent } from './layermanager.component';

describe('LayermanagerComponent', () => {
  let component: LayermanagerComponent;
  let fixture: ComponentFixture<LayermanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayermanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
