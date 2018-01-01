import { Component, OnInit } from '@angular/core';
import { LyricService } from '../services/lyric.service';


@Component({
  selector: 'app-top-lyrics',
  templateUrl: './top-lyrics.component.html',
  styleUrls: ['./top-lyrics.component.css']
})
export class TopLyricsComponent implements OnInit {
  theLyrics = null;

  constructor(
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    this._lyricService.getTop100Lyric()
    .then(theLyrics => {this.theLyrics = theLyrics})
    .catch(console.log)
  }

}
