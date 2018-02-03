import { Component, OnInit } from '@angular/core';
import { LyricService } from '../services/lyric.service';


@Component({
  selector: 'app-top-lyrics',
  templateUrl: './top-lyrics.component.html',
  styleUrls: ['./top-lyrics.component.css']
})
export class TopLyricsComponent implements OnInit {
  theLyrics = null;
  qty = 20;

  constructor(
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    this._lyricService.getTop100Lyric(10)
    .then(theLyrics => {
      this.theLyrics = theLyrics
      console.log(theLyrics)
    })
    .catch(console.log)

  }

  getMoreLyrics(qty){
    this._lyricService.getTop100Lyric(qty)
    .then(theLyrics => {this.theLyrics = theLyrics})
    .catch(console.log)

    if (qty == 20) { this.qty = 30}
    if (qty == 30) { this.qty = 40}
    if (qty == 40) { this.qty = 50}
    if (qty == 50) { this.qty = 60}
    if (qty == 60) { this.qty = 70}
    if (qty == 70) { this.qty = 80}
    if (qty == 80) { this.qty = 90}
    if (qty == 90) { this.qty = 100}
    if (qty == 100) { this.qty = 0}
  }

}
