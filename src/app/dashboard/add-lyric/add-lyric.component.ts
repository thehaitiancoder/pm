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
import { Router } from '@angular/router';


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
  carnival_year: Array<String> = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000']

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
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.lyric.author = this.loggedUserId = this._cookieService.get('userId');
  }

  addLyric(){
    // create slug
    // this.lyric.url = this.lyric.singerOnPage.toLowerCase().replace(/ +/g, "-") + "-" + this.lyric.title.toLowerCase().replace(/ +/g, "-");

    this._lyricService.addNewLyric(this.lyric)
      .then(addedlyric => { 
        this.lyricAddedConfirmation = true; 
        setTimeout(() => {
          this._router.navigate(['dashboard', 'home']);
        }, 3000);
      })
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

  checkForSingerName(){ // See checkForFeaturersName() method for comments that can help for this method
    var singerToLookFor = this.lyric.singerOnPage

    if (this.lyric.singerOnPage.length == 0) {
      this.noSingerToAdd = false;
      this.singerToAdd = null;
      this.singerAlbumList = [];
    }

    if (this.lyric.singerOnPage.length > 1) {
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
    // create slug for artist single page
    this.singer.url = singerName.toLowerCase().replace(/ +/g, "-");

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
        this.lyric.feat.push({singer: singer._id});
        this.featurerOneToAdd = null;
        this.featurer.one = singer; // Show a button to add a new artist
        this.nofeaturerOneToAdd = false;
        this.featurerOneCreateSuccessfully = true;
      }

      if (featNo == 2) {
        this.featuring.two = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerTwoToAdd = null;
        this.featurer.two = singer; // Show a button to add a new artist
        this.nofeaturerTwoToAdd = false;
        this.featurerTwoCreateSuccessfully = true;
      }

      if (featNo == 3) {
        this.featuring.three = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerThreeToAdd = null;
        this.featurer.three = singer; // Show a button to add a new artist
        this.nofeaturerThreeToAdd = false;
        this.featurerThreeCreateSuccessfully = true;
      }

      if (featNo == 4) {
        this.featuring.four = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerFourToAdd = null;
        this.featurer.four = singer; // Show a button to add a new artist
        this.nofeaturerFourToAdd = false;
        this.featurerFourCreateSuccessfully = true;
      }

      if (featNo == 5) {
        this.featuring.five = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerFiveToAdd = null;
        this.featurer.five = singer; // Show a button to add a new artist
        this.nofeaturerFiveToAdd = false;
        this.featurerFiveCreateSuccessfully = true;
      }

      if (featNo == 6) {
        this.featuring.six = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerSixToAdd = null;
        this.featurer.six = singer; // Show a button to add a new artist
        this.nofeaturerSixToAdd = false;
        this.featurerSixCreateSuccessfully = true;
      }

      if (featNo == 7) {
        this.featuring.seven = singer.name;
        this.lyric.feat.push({singer: singer._id});
        this.featurerSevenToAdd = null;
        this.featurer.seven = singer; // Show a button to add a new artist
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

  checkForFeaturersName(featurerName, feat) { // Look up the name for the featured artists
    /*  This function makes a call to the db to look for an artist name
        If a match is found the user should pick one of the artist
        Otherwise the user will add the artist to the DB */

    if (feat == 1) { // First featured artist on the song; 7 possible
      if (featurerName.length == 0) { //handle the keyup event (if user clears the field, hides the options)
        this.nofeaturerOneToAdd = false;
        this.featurerOneToAdd = null;
      }
  
      if (featurerName.length > 1) { // Makes the call only if the artist name is at least 2 char long
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerOne => {
          if (featurerOne.length > 0) {
            this.featurerOneToAdd = featurerOne; // List of suggested artists
            this.nofeaturerOneToAdd = false;
          }
  
          if (featurerOne.length == 0) {
            this.nofeaturerOneToAdd = true; // Present the user with option to add a new artist
          }
        })
      }
    }

    if (feat == 2) {
      if (featurerName.length == 0) {
        this.nofeaturerTwoToAdd = false;
        this.featurerTwoToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerTwo => {
          if (featurerTwo.length > 0) {
            this.featurerTwoToAdd = featurerTwo;
            this.nofeaturerTwoToAdd = false;
          }
  
          if (featurerTwo.length == 0) {
            this.nofeaturerTwoToAdd = true;
          }
        })
      }
    }

    if (feat == 3) {
      if (featurerName.length == 0) { //handle the keyup event
        this.nofeaturerThreeToAdd = false;
        this.featurerThreeToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerThree => {
          if (featurerThree.length > 0) {
            this.featurerThreeToAdd = featurerThree;
            this.nofeaturerThreeToAdd = false;
          }
  
          if (featurerThree.length == 0) {
            this.nofeaturerThreeToAdd = true;
          }
        })
      }
    }

    if (feat == 4) {
      if (featurerName.length == 0) {
        this.nofeaturerFourToAdd = false;
        this.featurerFourToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerFour => {
          if (featurerFour.length > 0) {
            this.featurerFourToAdd = featurerFour;
            this.nofeaturerFourToAdd = false;
          }
  
          if (featurerFour.length == 0) {
            this.nofeaturerFourToAdd = true;
          }
        })
      }
    }

    if (feat == 5) {
      if (featurerName.length == 0) {
        this.nofeaturerFiveToAdd = false;
        this.featurerFiveToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerFive => {
          if (featurerFive.length > 0) {
            this.featurerFiveToAdd = featurerFive;
            this.nofeaturerFiveToAdd = false;
          }
  
          if (featurerFive.length == 0) {
            this.nofeaturerFiveToAdd = true;
          }
        })
      }
    }

    if (feat == 6) {
      if (featurerName.length == 0) {
        this.nofeaturerSixToAdd = false;
        this.featurerSixToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerSix => {
          if (featurerSix.length > 0) {
            this.featurerSixToAdd = featurerSix;
            this.nofeaturerSixToAdd = false;
          }
  
          if (featurerSix.length == 0) {
            this.nofeaturerSixToAdd = true;
          }
        })
      }
    }

    if (feat == 7) {
      if (featurerName.length == 0) {
        this.nofeaturerSevenToAdd = false;
        this.featurerSevenToAdd = null;
      }
  
      if (featurerName.length > 1) {
        this._lyricService.checkForSingerName(featurerName)
        .then(featurerSeven => {
          if (featurerSeven.length > 0) {
            this.featurerSevenToAdd = featurerSeven;
            this.nofeaturerSevenToAdd = false;
          }
  
          if (featurerSeven.length == 0) {
            this.nofeaturerSevenToAdd = true;
          }
        })
      }
    }
  }

  setFeaturerName(featurerNameDisplay, featurerId, featurerName, feat){
    if (feat == 1) { this.featuring.one = featurerName; this.featurer.one = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerOneToAdd = null;}
    if (feat == 2) { this.featuring.two = featurerName; this.featurer.two = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerTwoToAdd = null;}
    if (feat == 3) { this.featuring.three = featurerName; this.featurer.three = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerThreeToAdd = null;}
    if (feat == 4) { this.featuring.four = featurerName; this.featurer.four = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerFourToAdd = null;}
    if (feat == 5) { this.featuring.five = featurerName; this.featurer.five = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerFiveToAdd = null;}
    if (feat == 6) { this.featuring.six = featurerName; this.featurer.six = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerSixToAdd = null;}
    if (feat == 7) { this.featuring.seven = featurerName; this.featurer.seven = featurerId; this.lyric.feat.push({singer: featurerId}) ; this.featurerSevenToAdd = null;}
    
    
  }

}
