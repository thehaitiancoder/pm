import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabodayComponent } from './raboday.component';

describe('RabodayComponent', () => {
  let component: RabodayComponent;
  let fixture: ComponentFixture<RabodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
