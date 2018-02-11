import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonpaComponent } from './konpa.component';

describe('KonpaComponent', () => {
  let component: KonpaComponent;
  let fixture: ComponentFixture<KonpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
