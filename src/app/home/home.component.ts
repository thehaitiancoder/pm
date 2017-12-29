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

  constructor(
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    
  }

  searchForLyrics(){
    if (this.searchInput.length > 2){
      this._lyricService.generalLyricSearch(this.searchInput)
      .then(lyricSearched => {
        this.searchResult = lyricSearched
        console.log(lyricSearched)
      })
    }
  }

}
