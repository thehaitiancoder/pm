import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReggeaComponent } from './reggea.component';

describe('ReggeaComponent', () => {
  let component: ReggeaComponent;
  let fixture: ComponentFixture<ReggeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReggeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
