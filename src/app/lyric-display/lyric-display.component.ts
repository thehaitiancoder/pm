import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LyricService } from '../services/lyric.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Meta, Title } from '@angular/platform-browser';
import { Comment } from '../models/comment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-lyric-display',
  templateUrl: './lyric-display.component.html',
  styleUrls: ['./lyric-display.component.css']
})
export class LyricDisplayComponent implements OnInit {
  loggedInUser: String;
  comment = new Comment();
  url = {url: ''};
  theLyric = null;
  addedComment = null;
  theComments: Array<Object> = [];
  showSoundcloudPlayer: Boolean = false;
  soundCloudSrc: SafeResourceUrl;
  youtubeSrc: SafeResourceUrl;
  displayCommentForm: Boolean = true; // Hides the comment form onclik if the user is not logged in and ask for loggin.
  upvotedCommentColor = '';
  upvotedCommentNewSum = 0;
  upvotedComment = null;
  upvoteToIncrease: String;
  upvoteToHighlight: String;
  ownerOfUpvote: String;
  upvoted = false;
  commentFieldIsActive: Boolean = false;
  commentFieldLength = 2;
  userNotLoggedIn: Boolean = false;
  userNotLoggedInToLikeComment: Boolean = false;
  userWantToLikeComment: Boolean = false;
  commentToShowError: String;

  constructor(
    private _route: ActivatedRoute,
    private _lyricService: LyricService,
    private _sanitizer: DomSanitizer,
    private _cookieService: CookieService,
    private _meta: Meta,
    private _title: Title,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.url.url = params.get('url')

      console.log(this.url)

      // Get the lyrics for the active url
      this._lyricService.displayOneLyric(this.url)
      .then(lyricToDisplay => {
        this.theLyric = lyricToDisplay;
        this._title.setTitle(`Pawòl ${this.theLyric.title} - ${this.theLyric.singer.name} | PawolMizik.com`)

        this._meta.addTags([
          {name: "", content: ""}
        ])

        if (lyricToDisplay.youtube != null) {
          this.youtubeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(`${lyricToDisplay.youtube}`)
        }
        console.log(this.theLyric)

        // Load the comments on init
        // Future Update: Needs to be loaded on call to save on bandwitch on loading time
        this._lyricService.getAllTheCommentsForActiveLyric(lyricToDisplay._id)
        .then(theComments => {
          this.theComments = theComments
          // Checking for the logging user in the upvotes
          this.checkForUpvotes(theComments);

          console.log(theComments)
        })
      })

      console.log(this._router.url)

    })

    this.loggedInUser = this._cookieService.get('userId');

  }

  // Generates the soundcloud player for this lyric
  // this can be call on click only if the lyric has a soundcloud link
  playSoundcloud(soundcloudLink){
    this.soundCloudSrc = this._sanitizer.bypassSecurityTrustResourceUrl(`https://w.soundcloud.com/player/?url=${soundcloudLink}&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true`)
    this.showSoundcloudPlayer = true;
  }

  // This method adds comments to a lyric
  addComment(){
    this.comment.lyric = this.theLyric._id; // the Id of the lyric is required
    this.comment.user = this._cookieService.get('userId'); // Only logged In user should add comments

    if (this.comment.content.length > 0) {
      this._lyricService.addComment(this.comment)
      .then(addedComment => {
        this.theComments.splice(0, 0, addedComment);
        this.comment.content = '';
        this.commentFieldIsActive = false;
        this.commentFieldLength = 2;
      })
    }
  }

  commentFieldActive() {
    this.commentFieldIsActive = true;
    this.commentFieldLength = 7;

    if (this._cookieService.get('userId') == undefined) {
      this.userNotLoggedIn = true;
      this.displayCommentForm = false;

    }
  }

  checkForUpvotes(theComments){
    for (var comment=0;comment < theComments.length; comment++) {
      for (var upvote = 0; upvote < theComments[comment].upvote.length; upvote++) {
        if (theComments[comment].upvote[upvote].user == this._cookieService.get('userId')) {
          this.upvotedCommentColor = 'upvotedCommentConfColor';
          // this.upvoted = true;
          this.ownerOfUpvote = theComments[comment].upvote[upvote].user; // the ID of the Upvote
        }
        else { this.upvotedCommentColor = ''}
      }
    }
  }

}
