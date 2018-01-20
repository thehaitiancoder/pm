import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LyricService } from '../../services/lyric.service';

@Component({
  selector: 'app-earning-details',
  templateUrl: './earning-details.component.html',
  styleUrls: ['./earning-details.component.css']
})
export class EarningDetailsComponent implements OnInit {
  loggedUserLyrics: Array<Object> = [];

  constructor(
    private _cookieService: CookieService,
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    this._lyricService.getLoggedUserLyric(this._cookieService.get('userId'))
    .then(loggedUserLyrics => {
      this.loggedUserLyrics = loggedUserLyrics
      console.log(loggedUserLyrics)
    })
  }

}
