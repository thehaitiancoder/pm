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

  getArtistTracks(artistId) {
    // make the request with a final url as /pm/api/baky-url/5a75c09b071bc8527874416f
    return this._http.get(this.api + 'tracks/' + artistId)
    .map(response => response.json())
    .toPromise();
  }

  getArtistsInAlphabeticalOrder(letterToRequest) {
    return this._http.get(this.api + 'atis/' + letterToRequest)
    .map(response => response.json())
    .toPromise();
  }

}
