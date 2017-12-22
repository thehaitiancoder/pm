import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Lyric } from '../models/lyric';

@Injectable()
export class LyricService {
  base= '/lyrics/new'

  constructor(
    private _http: Http
  ) { }

  addNewLyric(lyric: Lyric){
    return this._http.post(this.base, lyric)
    .map(response => response.json())
    .toPromise();
  }
}
