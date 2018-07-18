import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLyricsLandingComponent } from './add-lyrics-landing.component';

describe('AddLyricsLandingComponent', () => {
  let component: AddLyricsLandingComponent;
  let fixture: ComponentFixture<AddLyricsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLyricsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLyricsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
