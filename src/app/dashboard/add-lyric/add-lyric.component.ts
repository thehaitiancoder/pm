import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LyricService } from '../../services/lyric.service';
import { Lyric } from '../../models/lyric';
import { User } from '../../models/user';
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
  singerToAdd = null;
  user = new User;
  existingLyricTitles: Array<Object> = [];
  errorColorTitle = 'red';
  errorColorSinger = 'red';
  errorColorLyric = 'red';
  featurer1 = false;
  featurer2 = false;
  featurer3 = false;
  featurer4 = false;
  featurer5 = false;
  featurer6 = false;
  featurer7 = false;
  featurer8 = false;
  featurer9 = false;
  featurer10 = false;
  lyricSubmitted = false;

  constructor(
    private _authService: AuthService,
    private _lyricService: LyricService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.lyric.author = this.loggedUserId = this._cookieService.get('userId');
  }

  addLyric(){
    this.lyric.url = this.lyric.singer.toLowerCase().replace(/ +/g, "-") + "-" + this.lyric.title.toLowerCase().replace(/ +/g, "-");

    this._lyricService.addNewLyric(this.lyric)
    .then(addedlyric => {
      this.lyricAddedConfirmation = true
    })
  }

  lyricAvailability() {
    if (this.lyric.title.length > 0) {this.errorColorTitle = ''};
    if (this.lyric.title.length == 0) { this.errorColorTitle = 'red'};
    if (this.lyric.singer != null){
      if (this.lyric.singer.length > 0) {this.errorColorSinger = ''};
      if (this.lyric.singer.length == 0) { this.errorColorSinger = 'red'};
    }
    if (this.lyric.lyrics != null) {
      if (this.lyric.lyrics.length > 0) {this.errorColorLyric = ''};
      if (this.lyric.lyrics.length == 0) { this.errorColorLyric = 'red'};
    }

    this._lyricService.lyricTitleCheck(this.lyric)
    .then(titleAlreadyExist => {
      this.existingLyricTitles = titleAlreadyExist;

    if (this.lyric.singer) {
      for(var i = 0; i < titleAlreadyExist.length; i++){
        if (titleAlreadyExist[i].singer != this.lyric.singer && titleAlreadyExist[i].score > 1){
          this.existingLyricTitles = [];
        }
      }
    }

      console.log(this.existingLyricTitles)
    })
  }

  featurerAvailable(answer){ // This function triggers the addition of featuring artists to the song
    if (answer == 'no'){
      this.featurer1 = this.featurer2 = this.featurer3 = this.featurer4 = this.featurer4 = this.featurer5 = this.featurer6 = this.featurer7 = this.featurer8 = this.featurer9 = this.featurer10 = false;
    }
    // The lines below should be replace with a switch statement for more clarity
    if (answer == 'yes'){ this.featurer1 = true};
    if (answer == '2'){ this.featurer2 = true};
    if (answer == '3'){ this.featurer3 = true};
    if (answer == '4'){ this.featurer4 = true};
    if (answer == '5'){ this.featurer5 = true};
    if (answer == '6'){ this.featurer6 = true};
    if (answer == '7'){ this.featurer7 = true};
    if (answer == '8'){ this.featurer8 = true};
    if (answer == '9'){ this.featurer9 = true};
    if (answer == '10'){ this.featurer10 = true};
  }

  nextLyric(form){
    form.value.clear;
    this.lyricAddedConfirmation = false

  }

  checkForSingerName(){
    var singerToLookFor = this.lyric.singer
    this._lyricService.checkForSingerName(singerToLookFor)
    .then(singer => {
      this.singerToAdd = singer
      console.log(singer)
    })
  }

  setSingerName(singerId, singerName){
    this.lyric.singer = singerName;
  }

}
