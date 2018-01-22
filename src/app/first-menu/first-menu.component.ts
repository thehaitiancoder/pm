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
  usernameTooShort: Boolean;
  loggedUserId = null;
  loggedUserProfil = null;
  logginError: String;
  signUpError: String;
  signUpErrors: Array<String> = [];
  logginAttemptRemaining: number = 10;
  emailFormatIsValid: Boolean = false;
  resetReqSuccesfullMsg: String;
  askVisitorToRegister: Boolean = false;
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
  makeSearchInputLonger = 'initialForm';
  makeInputGroupLonger = 'initialInputGroup';

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
    .catch(errors => {
      this.signUpError = errors._body;
      var emailError    = "Email sa anrejistre sou sit la deja!",
          usernameError = "Non itilizatè sa anrejistre deja",
          pwdError      = "Mokle ou a pa respekte fòm ke sit la mande w la."

      if (this.signUpError.includes("email")) { this.signUpErrors.push(emailError)}
      else if (!this.signUpError.includes("email")) { this.removeError(emailError)}

      if (this.signUpError.includes("username")) { this.signUpErrors.push(usernameError) }
      else if (!this.signUpError.includes("username")) { this.removeError(usernameError)}

      if (this.signUpError.includes("password")) { this.signUpErrors.push(pwdError) }
      else if (!this.signUpError.includes("password")) { this.removeError(pwdError)}
    })
  }

  removeError(errorToRemove){
    for (var error= this.signUpErrors.length-1; error>=0; error--) {
      if (this.signUpErrors[error] === errorToRemove) {
          this.signUpErrors.splice(error, 1);
      }
    }
  }

  login(){
    const emailFormatReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailFormatReg.test(this.user.email.toString())) {
      this.emailFormatIsValid = true;
      this._authService.login(this.user)
      .then((user) => {
        location.href = '/dashboard';
      })
      .catch(errors => {
        console.log(errors)
        this.logginError = errors._body;
        this.logginAttemptRemaining -= 1;
        if (this.logginAttemptRemaining == 0) {
          
        }
      })
    }
    else {
      this.logginError = 'Email ou a gen yon erè. Korije li'
    }
  }

  emailErrorCheck(){
    const emailFormatReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.user.email.length > 0) {
      if (!emailFormatReg.test(this.user.email.toString())) {
        this.logginError = 'Email ou a gen yon erè. Korije li'
      }
      else { this.logginError = ''}
    }
    else {
      this.logginError = 'Antre Email ou pouw ka konekte'
    }
  }

  reset() {
    this._authService.reset(this.user)
    .then(response => {
      this.resetReqSuccesfullMsg = response;
    })
    .catch(errors => {
      if (errors.status == 401) {
        this.askVisitorToRegister = true;
      }
    })
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
    if (this.user.username.length > 0 && this.user.username.length < 3) {
      this.usernameTooShort = true;
      this.usernameExist = null;
    }
    else if (this.user.username.length >= 3) {
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
    else if (this.user.username.length == 0) {
      this.usernameExist = null;
      this.usernameTooShort = false;
    }
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
    if (pwdLowcaseReq.test(this.user.password.toString())){ this.pwdLowercaseReq = "pwdLowercaseReq" }
    if (!pwdLowcaseReq.test(this.user.password.toString())) { this.pwdLowercaseReq = null}

    if (pwdUpperReq.test(this.user.password.toString())){ this.pwdUppercaseReq = "pwdUppercaseReq" }
    if (!pwdUpperReq.test(this.user.password.toString())){ this.pwdUppercaseReq = null }

    if (pwdNumberReq.test(this.user.password.toString())) { this.pwdNumberReq = 'pwdNumberReq' }
    if (!pwdNumberReq.test(this.user.password.toString())) { this.pwdNumberReq = null }

    if (this.user.password.toString().length >= 8) { this.pwdLenghtReq = "pwdLenghtReq" }
    if (this.user.password.toString().length < 8) { this.pwdLenghtReq = null }

    if (this.pwdLowercaseReq == "pwdLowercaseReq" && this.pwdUppercaseReq == "pwdUppercaseReq" && this.pwdNumberReq == 'pwdNumberReq' && this.pwdLenghtReq === "pwdLenghtReq") { this.pwdReqMet = true; this.pwdReq = false;}
    if (this.pwdLowercaseReq != "pwdLowercaseReq" || this.pwdUppercaseReq != "pwdUppercaseReq" || this.pwdNumberReq != 'pwdNumberReq' || this.pwdLenghtReq != "pwdLenghtReq") { this.pwdReqMet = false; this.pwdReq = true;}
  }

  checkPwdConf() {
    if (this.user.password == this.user.password_confirmation) {
      this.pwdConfMet = true;
    }
    else if (this.user.password != this.user.password_confirmation){
      this.pwdConfMet = false;
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
      this.makeSearchInputLonger = 'initialForm';
      this.makeInputGroupLonger = 'initialInputGroup';
      this.searchActiveDesktop = true;
    }, 500);
  }

  hideLoader(){ // and search form on mobile
    if(this.searchInput.length == 0){ 
      this.searchResult = null;
      this.showSearchForm = false;
      this.hideLaunchSearch = true;
      this.makeSearchInputLonger = 'initialForm';
      this.makeInputGroupLonger = 'initialInputGroup';
      this.searchActiveDesktop = true;
    };
  }

  showSearchFormCall() {
    this.showSearchForm = true;
    this.hideLaunchSearch = false;
  }

}
