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
  comment = new Comment();
  url = {url: ''};
  theLyric = null;
  addedComment = null;
  theComments: Array<Object> = [];
  showSoundcloudPlayer: Boolean = false;
  soundCloudSrc: SafeResourceUrl;
  youtubeSrc: SafeResourceUrl;
  upvotedCommentColor = '';
  upvotedCommentNewSum = 0;
  upvotedComment = null;
  upvoted = false;
  commentFieldIsActive: Boolean = false;
  commentFieldLength = 2;
  userNotLoggedIn: Boolean = false;

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
        this._title.setTitle(`Pawòl ${this.theLyric.title} - ${this.theLyric.singer} | PawolMizik.com`)

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
          for (var comment=0;comment < theComments.length; comment++) {
            for (var upvote = 0; upvote < theComments[comment].upvote.length; upvote++) {
              if (theComments[comment].upvote[upvote].user == this._cookieService.get('userId')) {
                this.upvotedCommentColor = 'upvotedCommentConfColor';
                this.upvoted = true;
              }
            }
          }

          console.log(theComments)
        })
      })

      console.log(this._router.url)

    })

  }

  playSoundcloud(soundcloudLink){
    this.soundCloudSrc = this._sanitizer.bypassSecurityTrustResourceUrl(`https://w.soundcloud.com/player/?url=${soundcloudLink}&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true`)
    this.showSoundcloudPlayer = true;
  }

  addComment(){
    this.comment.lyric = this.theLyric._id;
    this.comment.user = this._cookieService.get('userId');

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

  voteCommentUp(commentId) {
    this.comment._id = commentId;
    if (this.upvoted == false) { this.comment.upvote = {user: this._cookieService.get('userId')}};
    if ( this.upvoted == true ) { this.comment.downvote = {user: this._cookieService.get('userId')}};
    this._lyricService.voteCommentUpOrDown(this.comment)
    .then(upvotedComment => {
      console.log(upvotedComment)
      this.upvotedComment = upvotedComment;
      this.upvotedCommentColor = 'upvotedCommentConfColor';
      this.upvoted = true;
    })
  }

  commentFieldActive() {
    this.commentFieldIsActive = true;
    this.commentFieldLength = 7;

    if (this._cookieService.get('userId') == undefined) {
      this.userNotLoggedIn = true;
    }
  }

}
