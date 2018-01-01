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

  // Future update: Create a comment service instead of having the comments in here
  addComment(thecomment) {
    return this._http.post('/lyric/comments', thecomment)
    .map(response => response.json())
    .toPromise();
  }

  getAllTheCommentsForActiveLyric(lyricId){
    return this._http.get('/lyric/comments/' + lyricId)
    .map(response => response.json())
    .toPromise();
  }

  voteCommentUpOrDown(comment) {
    return this._http.put('/lyric/comments/votes', comment)
    .map(response => response.json())
    .toPromise();
  }

  getTop100Lyric() {
    return this._http.get('/lyrics/top-100')
    .map(response => response.json())
    .toPromise();
  }

}
