import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoubadouComponent } from './twoubadou.component';

describe('TwoubadouComponent', () => {
  let component: TwoubadouComponent;
  let fixture: ComponentFixture<TwoubadouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoubadouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoubadouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
