import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { AuthService } from '../services/auth.service';

import { User } from '../models/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUserId = null;
  loggedUserProfil = null;
  loggedUserName = null;

  constructor(
    private _authService: AuthService,
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loggedUserId = this._cookieService.get('userId');
    this.loggedUserName = this._cookieService.get('repName');

    if (this.loggedUserId != null) {
      this._authService.getOneUser(this.loggedUserId)
      .then(loggedUserProfile => {
        this.loggedUserProfil = loggedUserProfile
        console.log(this.loggedUserProfil)
      })
    }

    // Avoid access to the dashboard if the use is not logged in
    if (this.loggedUserId == null) {
      this._router.navigate([''])
    }
  }

}
