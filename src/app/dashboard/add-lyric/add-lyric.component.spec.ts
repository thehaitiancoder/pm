import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLyricComponent } from './add-lyric.component';

describe('AddLyricComponent', () => {
  let component: AddLyricComponent;
  let fixture: ComponentFixture<AddLyricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLyricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLyricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
