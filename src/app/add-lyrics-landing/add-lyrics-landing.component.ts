import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-lyrics-landing',
  templateUrl: './add-lyrics-landing.component.html',
  styleUrls: ['./add-lyrics-landing.component.css']
})
export class AddLyricsLandingComponent implements OnInit {
  activateLoginLink: Boolean = true;
  activateLoggedInUserLinks: Boolean = false;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    if (this._authService.isAuthed()) {
      this.activateLoginLink = false;
      this.activateLoggedInUserLinks = true;
    }
  }

}
