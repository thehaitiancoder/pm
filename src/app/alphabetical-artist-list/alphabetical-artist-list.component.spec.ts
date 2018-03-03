import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticalArtistListComponent } from './alphabetical-artist-list.component';

describe('AlphabeticalArtistListComponent', () => {
  let component: AlphabeticalArtistListComponent;
  let fixture: ComponentFixture<AlphabeticalArtistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabeticalArtistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabeticalArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
