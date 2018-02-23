import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AtisService {
  api = '/pm/api/';

  constructor(
    private _http: Http
  ) { }

  getArtistPublicProfile(artistSlug){
    return this._http.get(this.api + artistSlug)
    .map(response => response.json())
    .toPromise();
  }

}
