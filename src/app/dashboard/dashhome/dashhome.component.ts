import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  loggedUser = null;

  constructor(
    private _authService: AuthService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this._authService.getOneUser(this._cookieService.get('userId'))
    .then(loggedUser => {
      this.loggedUser = loggedUser
    })
  }

}
