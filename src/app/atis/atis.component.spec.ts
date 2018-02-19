import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtisComponent } from './atis.component';

describe('AtisComponent', () => {
  let component: AtisComponent;
  let fixture: ComponentFixture<AtisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
