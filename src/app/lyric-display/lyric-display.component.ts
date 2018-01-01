import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LyricService } from '../services/lyric.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
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
  theComments = null;
  showSoundcloudPlayer: Boolean = false;
  soundCloudSrc: SafeResourceUrl;
  youtubeSrc: SafeResourceUrl;
  upvotedCommentColor = '';
  upvotedCommentNewSum = 0;
  upvotedComment = null;

  constructor(
    private _route: ActivatedRoute,
    private _lyricService: LyricService,
    private _sanitizer: DomSanitizer,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.url.url = params.get('url')

      console.log(this.url)

      // Get the lyrics for the active url
      this._lyricService.displayOneLyric(this.url)
      .then(lyricToDisplay => {
        this.theLyric = lyricToDisplay

        if (lyricToDisplay.youtube != null) {
          this.youtubeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(`${lyricToDisplay.youtube}`)
        }
        console.log(this.theLyric)

        //Load the comments on init
        // Future Update: Needs to be loaded on call to save on bandwitch on loading time
        this._lyricService.getAllTheCommentsForActiveLyric(lyricToDisplay._id)
        .then(theComments => {
          this.theComments = theComments
          console.log(theComments)
        })
      })

    })

  }

  playSoundcloud(soundcloudLink){
    this.soundCloudSrc = this._sanitizer.bypassSecurityTrustResourceUrl(`https://w.soundcloud.com/player/?url=${soundcloudLink}&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true`)
    this.showSoundcloudPlayer = true;
  }

  addComment(){
    this.comment.lyric = this.theLyric._id;
    this.comment.user = this._cookieService.get('userId');
    this._lyricService.addComment(this.comment)
    .then(addedComment => {
      this.addedComment = addedComment
    })
  }

  voteCommentUpOrDown(commentId, upOrDownvote){
    this.comment._id = commentId;
    this.comment.user = this._cookieService.get('userId');
    if (upOrDownvote == 1) { this.comment.upvote = 1};
    if (upOrDownvote == -1) { this.comment.downvote = -1}
    this._lyricService.voteCommentUpOrDown(this.comment)
    .then(upvotedComment => {
      this.upvotedComment = upvotedComment;
      this.upvotedCommentColor = 'upvotedCommentConfColor';
    })
  }

}
