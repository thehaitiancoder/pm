import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { LyricService } from '../../services/lyric.service';
import { Lyric } from '../../models/lyric';
import { User } from '../../models/user';
import { Album } from '../../models/album';
import { Featurer } from '../../models/featuring';
import { Featuring } from '../../models/featurer_binding';
import { Singer } from '../../models/singer';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-add-lyric',
  templateUrl: './add-lyric.component.html',
  styleUrls: ['./add-lyric.component.css']
})
export class AddLyricComponent implements OnInit {
  // important var
  user = new User;
  lyric = new Lyric;
  singer = new Singer;
  album = new Album;
  featurer = new Featurer;
  featuring = new Featuring;
  loggedUserId = null;
  lyricAddedConfirmation: Boolean = false;
  existingLyricTitles: Array<Object> = [];
  lyricSubmitted = false;
  singerAlbumList: Array<Object> = [];

  // main singer
  singerToAdd = null;
  noSingerToAdd = false;
  singerCreateSuccessfully = false;

  // feat 1
  featurerOneToAdd = null;
  nofeaturerOneToAdd = false;
  featurerOneCreateSuccessfully = false;

  // feat 2
  featurerTwoToAdd = null;
  nofeaturerTwoToAdd = false;
  featurerTwoCreateSuccessfully = false;
  
  // feat 3
  featurerThreeToAdd = null;
  nofeaturerThreeToAdd = false;
  featurerThreeCreateSuccessfully = false;

  // feat 4
  featurerFourToAdd = null;
  nofeaturerFourToAdd = false;
  featurerFourCreateSuccessfully = false;

  // feat 5
  featurerFiveToAdd = null;
  nofeaturerFiveToAdd = false;
  featurerFiveCreateSuccessfully = false;

  // feat 6
  featurerSixToAdd = null;
  nofeaturerSixToAdd = false;
  featurerSixCreateSuccessfully = false;

  // feat 7
  featurerSevenToAdd = null;
  nofeaturerSevenToAdd = false;
  featurerSevenCreateSuccessfully = false;
  
  // styling and extra field outpout
  errorColorTitle = 'red';
  errorColorSinger = 'red';
  errorColorLyric = 'red';
  featurer1 = false; featurer2 = false; featurer3 = false; featurer4 = false;
  featurer5 = false; featurer6 = false; featurer7 = false;

  constructor(
    private _authService: AuthService,
    private _lyricService: LyricService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.lyric.author = this.loggedUserId = this._cookieService.get('userId');
  }

  addLyric(){
    // create slug
    // this.lyric.url = this.lyric.singerOnPage.toLowerCase().replace(/ +/g, "-") + "-" + this.lyric.title.toLowerCase().replace(/ +/g, "-");

    if (this.featurer.one != null) {
      this._lyricService.addNewLyric(this.lyric)
      .then(addedlyric => {
        // Create the featuring here
        this.featurer.lyric = addedlyric._id;
        this.featurer.singer = addedlyric.singer;
        this._lyricService.createFeaturing(this.featurer)
        .then(feauringList => {
            // Update the lyric with the featuring ID
            var lyric = {_id: addedlyric._id, featuring: feauringList._id}
            this._lyricService.updateLyricWithFeaturing(lyric)
            .then(finalLyric => {
              this.lyricAddedConfirmation = true;
            })
        })
      })
    }
    else {
      this._lyricService.addNewLyric(this.lyric)
      .then(addedlyric => {
        this.lyricAddedConfirmation = true;
      })
    }
  }

  lyricAvailability() {
    if (this.lyric.title.length > 0) {this.errorColorTitle = ''};
    if (this.lyric.title.length == 0) { this.errorColorTitle = 'red'};
    if (this.lyric.singer != null){
      if (this.lyric.singer.length > 0) {this.errorColorSinger = ''};
      if (this.lyric.singer.length == 0) { this.errorColorSinger = 'red'};
    }
    if (this.lyric.lyrics != null) {
      if (this.lyric.lyrics.length > 0) {this.errorColorLyric = ''};
      if (this.lyric.lyrics.length == 0) { this.errorColorLyric = 'red'};
    }

    this._lyricService.lyricTitleCheck(this.lyric)
    .then(titleAlreadyExist => {
      this.existingLyricTitles = titleAlreadyExist;

    if (this.lyric.singer) {
      for(var i = 0; i < titleAlreadyExist.length; i++){
        if (titleAlreadyExist[i].singer != this.lyric.singer && titleAlreadyExist[i].score > 1){
          this.existingLyricTitles = [];
        }
      }
    }

      console.log(this.existingLyricTitles)
    })
  }

  featurerAvailable(answer){ // This function triggers the addition of featuring artists to the song
    if (answer == 'no'){
      this.featurer1 = this.featurer2 = this.featurer3 = this.featurer4 = this.featurer4 = this.featurer5 = this.featurer6 = this.featurer7;
    }
    // The lines below should be replace with a switch statement for more clarity
    if (answer == 'yes'){ this.featurer1 = true};
    if (answer == '2'){ this.featurer2 = true};
    if (answer == '3'){ this.featurer3 = true};
    if (answer == '4'){ this.featurer4 = true};
    if (answer == '5'){ this.featurer5 = true};
    if (answer == '6'){ this.featurer6 = true};
    if (answer == '7'){ this.featurer7 = true};
  }

  nextLyric(form){
    form.value.clear;
    this.lyricAddedConfirmation = false

  }

  checkForSingerName(){
    var singerToLookFor = this.lyric.singerOnPage

    if (this.lyric.singerOnPage.length == 0) { //handle the keyup event
      this.noSingerToAdd = false;
      this.singerToAdd = null;
      this.singerAlbumList = [];
    }

    if (this.lyric.singerOnPage.length > 0) {
      this._lyricService.checkForSingerName(singerToLookFor)
      .then(singer => {
        if (singer.length > 0) {
          this.singerToAdd = singer;
          this.noSingerToAdd = false;
        }

        if (singer.length == 0) {
          this.noSingerToAdd = true;
        }
      })
      .catch(console.log)
    }
  }

  setSingerName(singerId, singerName){
    this.lyric.singerOnPage = singerName;
    this.lyric.singer = singerId;
    this.singerToAdd = null;
    // get the album of the main singer
      this._lyricService.getSingAlbum(singerId)
      .then(singerAlbumList => { this.singerAlbumList = singerAlbumList})
  }

  createNewSinger(singerName, featNo) {
    this.singer.name = singerName;

    this._lyricService.createNewSinger(this.singer)
    .then(singer => {
      if (featNo == 0) {
        this.lyric.singerOnPage = singer.name;
        this.lyric.singer = singer._id;
        this.singerToAdd = null;
        this.noSingerToAdd = false;
        this.singerCreateSuccessfully = true;
      }

      if (featNo == 1) {
        this.featuring.one = singer.name;
        this.featurer.one = singer._id;
        console.log(this.lyric)
        this.featurerOneToAdd = null;
        this.nofeaturerOneToAdd = false;
        this.featurerOneCreateSuccessfully = true;
      }

      if (featNo == 2) {
        this.featuring.two = singer.name;
        this.featurer.two = singer._id;
        this.featurerTwoToAdd = null;
        this.nofeaturerTwoToAdd = false;
        this.featurerTwoCreateSuccessfully = true;
      }

      if (featNo == 3) {
        this.featuring.three = singer.name;
        this.featurer.three = singer._id;
        this.featurerThreeToAdd = null;
        this.nofeaturerThreeToAdd = false;
        this.featurerThreeCreateSuccessfully = true;
      }

      if (featNo == 4) {
        this.featuring.four = singer.name;
        this.featurer.four = singer._id;
        this.featurerFourToAdd = null;
        this.nofeaturerFourToAdd = false;
        this.featurerFourCreateSuccessfully = true;
      }

      if (featNo == 5) {
        this.featuring.five = singer.name;
        this.featurer.five = singer._id;
        this.featurerFiveToAdd = null;
        this.nofeaturerFiveToAdd = false;
        this.featurerFiveCreateSuccessfully = true;
      }

      if (featNo == 6) {
        this.featuring.six = singer.name;
        this.featurer.six = singer._id;
        this.featurerSixToAdd = null;
        this.nofeaturerSixToAdd = false;
        this.featurerSixCreateSuccessfully = true;
      }

      if (featNo == 7) {
        this.featuring.seven = singer.name;
        this.featurer.seven = singer._id;
        this.featurerSevenToAdd = null;
        this.nofeaturerSevenToAdd = false;
        this.featurerSevenCreateSuccessfully = true;
      }

      setTimeout(() => {
        if (featNo == 0) { this.singerCreateSuccessfully = false;}
        if (featNo == 1) { this.featurerOneCreateSuccessfully = false};
        if (featNo == 2) { this.featurerTwoCreateSuccessfully = false};
        if (featNo == 3) { this.featurerThreeCreateSuccessfully = false};
        if (featNo == 4) { this.featurerFourCreateSuccessfully = false};
        if (featNo == 5) { this.featurerFiveCreateSuccessfully = false};
        if (featNo == 6) { this.featurerSixCreateSuccessfully = false};
        if (featNo == 7) { this.featurerSevenCreateSuccessfully = false};
      }, 3000);
    })
  }

  cancelNewSingerCreation(){
    this.noSingerToAdd = false;
  }

  checkForFeaturersName(featurerName, feat) {

    if (feat == 1) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerOneToAdd = false;
        this.featurerOneToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerOne => {
          console.log(featurerOne)
          if (featurerOne.length > 0) {
            this.featurerOneToAdd = featurerOne;
            this.nofeaturerOneToAdd = false;
          }
  
          if (featurerOne.length == 0) {
            this.nofeaturerOneToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 2) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerTwoToAdd = false;
        this.featurerTwoToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerTwo => {
          console.log(featurerTwo)
          if (featurerTwo.length > 0) {
            this.featurerTwoToAdd = featurerTwo;
            this.nofeaturerTwoToAdd = false;
          }
  
          if (featurerTwo.length == 0) {
            this.nofeaturerTwoToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 3) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerThreeToAdd = false;
        this.featurerThreeToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerThree => {
          console.log(featurerThree)
          if (featurerThree.length > 0) {
            this.featurerThreeToAdd = featurerThree;
            this.nofeaturerThreeToAdd = false;
          }
  
          if (featurerThree.length == 0) {
            this.nofeaturerThreeToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 4) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerFourToAdd = false;
        this.featurerFourToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerFour => {
          console.log(featurerFour)
          if (featurerFour.length > 0) {
            this.featurerFourToAdd = featurerFour;
            this.nofeaturerFourToAdd = false;
          }
  
          if (featurerFour.length == 0) {
            this.nofeaturerFourToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 5) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerFiveToAdd = false;
        this.featurerFiveToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerFive => {
          console.log(featurerFive)
          if (featurerFive.length > 0) {
            this.featurerFiveToAdd = featurerFive;
            this.nofeaturerFiveToAdd = false;
          }
  
          if (featurerFive.length == 0) {
            this.nofeaturerFiveToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 6) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerSixToAdd = false;
        this.featurerSixToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerSix => {
          console.log(featurerSix)
          if (featurerSix.length > 0) {
            this.featurerSixToAdd = featurerSix;
            this.nofeaturerSixToAdd = false;
          }
  
          if (featurerSix.length == 0) {
            this.nofeaturerSixToAdd = true;
          }
        })
        .catch(console.log)
      }
    }

    if (feat == 7) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerSevenToAdd = false;
        this.featurerSevenToAdd = null;
      }
  
      if (featurerName.length > 0) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerSeven => {
          console.log(featurerSeven)
          if (featurerSeven.length > 0) {
            this.featurerSevenToAdd = featurerSeven;
            this.nofeaturerSevenToAdd = false;
          }
  
          if (featurerSeven.length == 0) {
            this.nofeaturerSevenToAdd = true;
          }
        })
        .catch(console.log)
      }
    }
  }

  setFeaturerName(featurerNameDisplay, featurerId, featurerName, feat){
    if (feat == 1) { this.featuring.one = featurerName; this.featurer.one = featurerId; this.lyric.feat = {one: featurerId}; this.featurerOneToAdd = null;}
    if (feat == 2) { this.featuring.two = featurerName; this.featurer.two = featurerId; this.lyric.feat = {two: featurerId}; this.featurerTwoToAdd = null;}
    if (feat == 3) { this.featuring.three = featurerName; this.featurer.three = featurerId; this.lyric.feat = {three: featurerId}; this.featurerThreeToAdd = null;}
    if (feat == 4) { this.featuring.four = featurerName; this.featurer.four = featurerId; this.lyric.feat = {four: featurerId}; this.featurerFourToAdd = null;}
    if (feat == 5) { this.featuring.five = featurerName; this.featurer.five = featurerId; this.lyric.feat = {five: featurerId}; this.featurerFiveToAdd = null;}
    if (feat == 6) { this.featuring.six = featurerName; this.featurer.six = featurerId; this.lyric.feat = {six: featurerId}; this.featurerSixToAdd = null;}
    if (feat == 7) { this.featuring.seven = featurerName; this.featurer.seven = featurerId; this.lyric.feat = {seven: featurerId}; this.featurerSevenToAdd = null;}
    
    
  }

}
