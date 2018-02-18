import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngajeComponent } from './angaje.component';

describe('AngajeComponent', () => {
  let component: AngajeComponent;
  let fixture: ComponentFixture<AngajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
