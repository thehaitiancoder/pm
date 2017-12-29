import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricDisplayComponent } from './lyric-display.component';

describe('LyricDisplayComponent', () => {
  let component: LyricDisplayComponent;
  let fixture: ComponentFixture<LyricDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
