import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  userId = null;
  base = '/auth/'

  constructor(
    private _http: Http,
    private _cookieService: CookieService
  ) { }

  register(user: User): Promise<User>{
    return this._http.post(this.base + 'register', user)
    .map(response => response.json())
    .toPromise();
  }

  login(user: User): Promise<User>{
    return this._http.post(this.base + 'login', user)
    .map(response => response.json())
    .toPromise();
  }

  reset(user) {
    return this._http.put('/auth/login/reset', user)
    .map(response => response.json())
    .toPromise();
  }

  logout(): Promise<User>{
    return this._http.delete(this.base + 'logout')
    .map(response => response.json())
    .toPromise();
  }

  currentUserId() {
    this.userId = this._cookieService.get('userId');
  }

  isAuthed(): boolean{
    const expired = parseInt(this._cookieService.get('expiration'));
    const UserId = this.currentUserId();
    const session = this._cookieService.get('session');

    return Boolean(session && expired && UserId && expired > Date.now());
  }

  usernameAvailability(username){
    return this._http.get(this.base + 'usernamecheck/' + username)
    .map(response => response.json())
    .toPromise();
  }

  getOneUser(userId){
    return this._http.get(this.base + 'userprofile/' + userId )
    .map(response => response.json())
    .toPromise();
  }

}
