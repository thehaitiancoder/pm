import { Component, OnInit } from '@angular/core';
import { LyricService } from '../services/lyric.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput = '';
  searchResult = null;
  showLoader = true;
  noResult = false;

  constructor(
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    
  }

  searchForLyrics(){
    this.showLoader = true;
    this.noResult = false;

    if (this.searchInput.length > 0){
      this._lyricService.generalLyricSearch(this.searchInput)
      .then(lyricSearched => {
        this.searchResult = lyricSearched
        if (lyricSearched.length > 0) { this.showLoader = false}
        if (lyricSearched.length == 0) {
          setTimeout(() => {
            this.showLoader = false;
            this.noResult = true;
          }, 15000);
        }
        // console.log(lyricSearched)
      })
    }
  }

  closeResult(){
    setTimeout(() => {
      this.searchResult = null;
      this.searchInput = '';
    }, 1000);
  }

  hideLoader(){
    if(this.searchInput.length == 0){ this.searchResult = null}
  }

}
