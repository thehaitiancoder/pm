const Lyric = require('mongoose').model('Lyric');
const User = require('mongoose').model('User');
const Comments = require('mongoose').model('Comment');
const Singer = require('mongoose').model('Singer');
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

    getLoggedUserLyrics(req, res) { // Track submitted lyrics to pay users for submission
        Lyric.find({author: req.params.id}).sort({createdAt: 'desc'})
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
        Comments.find({lyric: req.params.lyricId}).populate('user').sort({upvote: 'desc'}).sort({downvote: 'desc'})
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
        
    },

    getTop100Lyric(req, res) {
        Lyric.find().sort({views: 'desc'}).limit(parseInt(req.params.qty))
        .then(top100Lyrics => {res.json(top100Lyrics)})
        .catch(console.log)
    },

    checkForSingerName(req, res) { // to moved to its own controller
        Singer.find({$text: {$search: req.params.name}}, {score: {$meta: 'textScore'}}).sort({ score: { $meta: "textScore" } })
        .then(singerExist => {res.json(singerExist)})
        .catch(console.log)
    }
}