import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { AuthService } from '../services/auth.service';

import { User } from '../models/user';
import { LyricService } from '../services/lyric.service';

@Component({
  selector: 'app-first-menu',
  templateUrl: './first-menu.component.html',
  styleUrls: ['./first-menu.component.css']
})
export class FirstMenuComponent implements OnInit {
  usernameExist = null;
  loggedUserId = null;
  loggedUserProfil = null;
  pwdReq = null;
  pwdReqMet = false;
  pwdConfMet = null;
  pwdLowercaseReq = null;
  pwdUppercaseReq = null;
  pwdNumberReq = null;
  pwdLenghtReq = null;
  displaySearchInMenu = true;
  searchInput = '';
  searchResult = null;
  showLoader = true;
  noResult = false;
  showSearchForm = false;
  hideLaunchSearch = true;
  searchActiveDesktop = true;
  makeSearchInputLonger = '';
  makeInputGroupLonger = '';

  user = new User();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cookieService: CookieService,
    private _lyricService: LyricService
  ) { }

  ngOnInit() {
    this.loggedUserId = this._cookieService.get('userId')
    
    if (this.loggedUserId != null) {
      this._authService.getOneUser(this.loggedUserId)
    .then(loggedUserProfile => {
      this.loggedUserProfil = loggedUserProfile
    })
    }

    // Hides the search input in the menu on the homepage
    if (this._router.url == '/'){ this.displaySearchInMenu = false}
  }

  register(){
    this._authService.register(this.user)
    .then(() => {
      location.href = '/dashboard';
    })
    .catch(errors => console.log(errors))
  }

  login(){
    this._authService.login(this.user)
    .then((user) => {
      location.href = '/dashboard';
    })
    .catch(errors => console.log(errors))
  }

  logout(){
    this._authService.logout()
    .then(loggedOutUser => {
      /* Thanks the user
                for using 
                    the website */
      this._router.navigateByUrl(this._router.url)
    })
  }

  usernameAvailability(){
    this._authService.usernameAvailability(this.user.username)
    .then(usernameExist => {
      if (usernameExist == this.user.username) {
        this.usernameExist = usernameExist
      }
      else if (usernameExist != this.user.username) {
        this.usernameExist = false  
      }
    })
  }

  printPwdReq(){
    if (this.pwdReqMet) {
      this.pwdReq = false;
    }
    else {
      this.pwdReq = true;
    }
  }

  checkPwdReq(password){
    const pwdLowcaseReq = new RegExp("(?=.*[a-z])");
    const pwdUpperReq = new RegExp("(?=.*[A-Z])");
    const pwdNumberReq = new RegExp("(?=.*[0-9])");
    if (pwdLowcaseReq.test(password.model)){ this.pwdLowercaseReq = "pwdLowercaseReq" }
    if (pwdUpperReq.test(password.model)){ this.pwdUppercaseReq = "pwdUppercaseReq" }
    if (pwdNumberReq.test(password.model)) { this.pwdNumberReq = 'pwdNumberReq' }
    if (password.model.length >= 8) { this.pwdLenghtReq = "pwdLenghtReq" }
    if (this.pwdLowercaseReq == "pwdLowercaseReq" && this.pwdUppercaseReq == "pwdUppercaseReq" && this.pwdNumberReq == 'pwdNumberReq' && this.pwdLenghtReq === "pwdLenghtReq") {
      this.pwdReqMet = true;
      this.pwdReq = false;
    }
  }

  checkPwdConf() {
    if (this.user.password == this.user.password_confirmation) {
      this.pwdConfMet = true;
    }
  }

  // handling searches
  searchForLyrics(){
    this.showLoader = true;
    this.noResult = false;
    this.searchActiveDesktop = false;
    this.makeSearchInputLonger = 'longerForm';
    this.makeInputGroupLonger = 'longerInputGroup';

    if (this.searchInput.length > 0){
      this._lyricService.generalLyricSearch(this.searchInput)
      .then(lyricSearched => {
        this.searchResult = lyricSearched
        if (lyricSearched.length > 0) { this.showLoader = false}
        if (lyricSearched.length == 0) {
          setTimeout(() => {
            this.showLoader = false;
            this.noResult = true;
          }, 10000);
        }
        console.log(lyricSearched)
      })
    }
  }

  closeResult(){ // also hides search form on mobile
    setTimeout(() => {
      this.searchResult = null;
      this.searchInput = '';
      this.showSearchForm = false;
      this.hideLaunchSearch = true;
    }, 500);
  }

  hideLoader(){ // and search form on mobile
    if(this.searchInput.length == 0){ 
      this.searchResult = null;
      this.showSearchForm = false;
      this.hideLaunchSearch = true;
    };
  }

  showSearchFormCall() {
    this.showSearchForm = true;
    this.hideLaunchSearch = false;
  }

}
