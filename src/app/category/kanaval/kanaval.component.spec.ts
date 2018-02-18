import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanavalComponent } from './kanaval.component';

describe('KanavalComponent', () => {
  let component: KanavalComponent;
  let fixture: ComponentFixture<KanavalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanavalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanavalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
