import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Lyric } from '../models/lyric';
import { Featurer } from '../models/featuring';

@Injectable()
export class LyricService {
  api = '/pm/api/';

  constructor(
    private _http: Http
  ) { }

  addNewLyric(lyric: Lyric){
    return this._http.post(this.api + 'lyrics/new', lyric)
    .map(response => response.json())
    .toPromise();
  }

  lyricTitleCheck(lyricTitle){
    return this._http.post(this.api + 'lyrics/checktitle', lyricTitle)
    .map(response => response.json())
    .toPromise();
  }

  getLoggedUserLyric(userId) {
    return this._http.get(this.api + 'lyrics/user/' + userId)
    .map(response => response.json())
    .toPromise();
  }

  generalLyricSearch(termToSearchFor){
    return this._http.get(this.api + 'search/' + termToSearchFor)
    .map(response => response.json())
    .toPromise();
  }

  displayOneLyric(url){
    return this._http.post(this.api + 'showlyrics', url)
    .map(response => response.json())
    .toPromise();
  }

  // Future update: Create a comment service instead of having the comments in here
  addComment(thecomment) {
    console.log(thecomment)
    return this._http.post(this.api + 'lyric/comments', thecomment)
    .map(response => response.json())
    .toPromise();
  }

  getAllTheCommentsForActiveLyric(lyricId){
    return this._http.get(this.api + 'lyric/comments/' + lyricId)
    .map(response => response.json())
    .toPromise();
  }

  getTop100Lyric(qty) {
    return this._http.get(this.api + 'lyrics/top/' + qty)
    .map(response => response.json())
    .toPromise();
  }

  checkForSingerName(singerToLookFor){ // to be moved to a singer service
    return this._http.get(this.api + 'singer/' + singerToLookFor)
    .map( response => response.json())
    .toPromise();
  }

  createNewSinger(singerToCreate) {
    return this._http.post(this.api + 'singer', singerToCreate)
    .map( response => response.json())
    .toPromise();
  }

  getSingAlbum(singerId) {
    return this._http.get(this.api + 'album/' + singerId)
    .map(response => response.json())
    .toPromise();
  }

}
