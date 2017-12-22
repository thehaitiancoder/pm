import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LyricService } from '../../services/lyric.service';
import { Lyric } from '../../models/lyric';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-add-lyric',
  templateUrl: './add-lyric.component.html',
  styleUrls: ['./add-lyric.component.css']
})
export class AddLyricComponent implements OnInit {
  loggedUserId = null;
  lyricAddedConfirmation: Boolean = false;
  lyric = new Lyric;

  constructor(
    private _authService: AuthService,
    private _lyricService: LyricService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.lyric.author = this.loggedUserId = this._cookieService.get('userId');
  }

  addLyric(){
    this._lyricService.addNewLyric(this.lyric)
    .then(addedlyric => {
      this.lyricAddedConfirmation = true
    })
  }

}
