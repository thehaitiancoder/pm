/* The codes below are drafts code. Unfinished code removed from production
    Better logic is needed to accomplish the task */

// Html display to Like and Unlike comment
// <button (click)="voteCommentUp(comment._id)"
//                         [ngClass]="{'upvotedCommentConfColor': ownerOfUpvote == loggedInUser}"
//                         [ngClass]="{'upvotedCommentConfColor': upvoteToIncrease == comment._id}"
//                         class="btn btn-default">
//                         <span *ngIf="comment._id"><span *ngFor="let upvoteId of comment.upvote">{{upvoteId.user}}</span></span>
//                         <span class="glyphicon glyphicon-thumbs-up"></span>
//                         <span *ngIf="upvotedComment == null">{{ comment.upvote.length }}</span>
//                         <span *ngIf="upvotedComment != null && upvoteToIncrease == comment._id">{{ upvotedComment.upvote.length + 1}}</span>
//                 </button>
//                 <div *ngIf="userNotLoggedInToLikeComment && userWantToLikeComment && commentToShowError == comment._id" class="form-group likeCommentError">
//                     <button type="button" class="btn btn-default signUp" *ngIf="loggedUserId == null"><a data-toggle="modal" href="#SignUpModal"><span class="glyphicon glyphicon-user"></span> Anrejistre</a></button>
//                     <button type="button" class="btn btn-default login" *ngIf="loggedUserId == null"><a data-toggle="modal" href="#LogInModal"><span class="glyphicon glyphicon-log-in"></span> Konekte</a></button>
//                     <span> Pou w ka renmen kòmantè sa!</span>
//                 </div>


// voteCommentUp(commentId) {
//     if (this._cookieService.get('userId') == undefined) {
//       this.userWantToLikeComment = true;
//       this.userNotLoggedInToLikeComment = true;
//       this.commentToShowError = commentId
//     }
//     else {
//       this.comment._id = commentId;
//       if (this.upvoted == false) { this.comment.upvote = {user: this._cookieService.get('userId')}};
//       if ( this.upvoted == true ) { this.comment.downvote = {user: this._cookieService.get('userId')}};
//       this._lyricService.voteCommentUpOrDown(this.comment)
//       .then(upvotedComment => {
//         console.log(upvotedComment)
//         this.upvotedComment = upvotedComment;
//         this.upvotedCommentColor = 'upvotedCommentConfColor';
//         this.upvoteToIncrease = upvotedComment._id;
//         this.upvoted = true;
//     })
//     }
//   }

// Comment API
// voteCommentUpOrDown(req, res) {
//     console.log(req.body)
//     if (req.body.upvote) {
//         Comments.findByIdAndUpdate(req.body._id, {
//             $push: {upvote: req.body.upvote}
//         })
//         .then(updatedComment => { res.json(updatedComment)})
//         .catch(console.log)
//     }

//     if (req.body.downvote) {
//         Comments.findByIdAndUpdate(req.body._id, {
//             $pull: {upvote: req.body.downvote}
//         })
//         .then(updatedComment => { res.json(updatedComment)})
//         .catch(console.log)
//     }
     
// },