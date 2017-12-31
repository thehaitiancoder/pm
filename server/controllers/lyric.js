const Lyric = require('mongoose').model('Lyric');
const User = require('mongoose').model('User');
const Comments = require('mongoose').model('Comment');
const comments = new Comments;

module.exports = {
    addNewLyric(req, res){
        console.log(req.body)
        Lyric.create(req.body)
        .then(lyric => {
            // Give the user credits for the added lyric
            User.findByIdAndUpdate(req.body.author, {
                $inc: {
                    balance_lyric_pending: 5
                }
            })
            .catch(console.log)
            res.json(lyric)
        })
        .catch(console.log)
    },

    checkTitleExist(req, res) {
        Lyric.find({$text: {$search: req.body.title}}, {score: {$meta: 'textScore'}}).sort({ score: { $meta: "textScore" } })
        .then(titleExist => {res.json(titleExist)})
        .catch(console.log)
    },

    getLoggedUserLyrics(req, res) {
        Lyric.find({author: req.params.id})
        .then(loggedUserLyrics => {
            console.log(loggedUserLyrics)
            res.json(loggedUserLyrics)})
        .catch(console.log)
    },

    generalLyricSearch(req, res) {
        Lyric.find({$text: {$search: req.params.term}}, {score: {$meta: 'textScore'}}).sort({ score: { $meta: "textScore" } })
        .then(lyricsSearched => {res.json(lyricsSearched)})
        .catch(console.log)
    },

    displayOneLyric(req, res) {
        console.log(req.body)
        Lyric.findOne({url: req.body.url})
        .then(lyricToDisplay => {
            // Increase the view for this lyric
            Lyric.findByIdAndUpdate(lyricToDisplay._id, {
                $inc: {
                    views: 1
                }
            })
            .catch(console.log)
            res.json(lyricToDisplay)
        })
        .catch(console.log)
    },

    addComment(req, res) {
        Comments.create(req.body)
        .then(comment => {
            res.json(comment)
        })
        .catch(console.log)
    },

    getAllCommentsForActiveLyric(req, res) {
        Comments.find({lyric: req.params.lyricId}).populate('user').sort({upvote: 'desc'})
        .then(theComments => { res.json(theComments) })
        .catch(console.log)
    },

    voteCommentUpOrDown(req, res) {
        if (req.body.upvote == 1) {
            Comments.findByIdAndUpdate(req.body._id, {
                $inc: {upvote: 1}
            })
            .then(updatedComment => { res.json(updatedComment)})
            .catch(console.log)
        }
        if (req.body.downvote == -1) {
            Comments.findByIdAndUpdate(req.body._id, {
                $inc: {downvote: -1}
            })
            .then(updatedComment => { res.json(updatedComment)})
            .catch(console.log)
        }
        
    }
}