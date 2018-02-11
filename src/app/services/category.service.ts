import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  api = '/pm/api/';

  constructor(
    private _http: Http
  ) { }

  getCategoriesSongsCount(){
    return this._http.get(this.api + 'category')
    .map(response => response.json())
    .toPromise();
  }

}
