import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevanjilComponent } from './levanjil.component';

describe('LevanjilComponent', () => {
  let component: LevanjilComponent;
  let fixture: ComponentFixture<LevanjilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevanjilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevanjilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
