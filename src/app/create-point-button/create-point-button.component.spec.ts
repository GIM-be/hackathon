import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointButtonComponent } from './create-point-button.component';

describe('CreatePointButtonComponent', () => {
  let component: CreatePointButtonComponent;
  let fixture: ComponentFixture<CreatePointButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePointButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePointButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
