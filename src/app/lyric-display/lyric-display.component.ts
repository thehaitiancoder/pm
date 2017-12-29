import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LyricService } from '../services/lyric.service';

@Component({
  selector: 'app-lyric-display',
  templateUrl: './lyric-display.component.html',
  styleUrls: ['./lyric-display.component.css']
})
export class LyricDisplayComponent implements OnInit {
  url = {url: ''};
  theLyric = null;

  constructor(
    private _route: ActivatedRoute,
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.url.url = params.get('url')

      console.log(this.url)

      // Get the lyrics for the active url
      this._lyricService.displayOneLyric(this.url)
      .then(lyricToDisplay => {
        this.theLyric = lyricToDisplay
        console.log(this.theLyric)
      })
    })

  }

}
