import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasinComponent } from './rasin.component';

describe('RasinComponent', () => {
  let component: RasinComponent;
  let fixture: ComponentFixture<RasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
