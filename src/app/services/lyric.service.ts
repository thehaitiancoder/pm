import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Lyric } from '../models/lyric';

@Injectable()
export class LyricService {
  base= '/lyrics/new';

  constructor(
    private _http: Http
  ) { }

  addNewLyric(lyric: Lyric){
    return this._http.post(this.base, lyric)
    .map(response => response.json())
    .toPromise();
  }

  lyricTitleCheck(lyricTitle){
    return this._http.post('/lyrics/checktitle', lyricTitle)
    .map(response => response.json())
    .toPromise();
  }

  getLoggedUserLyric(userId) {
    return this._http.get('/lyrics/user/' + userId)
    .map(response => response.json())
    .toPromise();
  }

  generalLyricSearch(termToSearchFor){
    return this._http.get('/search/' + termToSearchFor)
    .map(response => response.json())
    .toPromise();
  }

  displayOneLyric(url){
    return this._http.post('/showlyrics/', url)
    .map(response => response.json())
    .toPromise();
  }

}
