const Lyric = require('mongoose').model('Lyric');
const Featurer = require('mongoose').model('Featurer');
const User = require('mongoose').model('User');
const Comments = require('mongoose').model('Comment');
const Singer = require('mongoose').model('Singer');
const Album = require('mongoose').model('Album');
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

    createFeaturing(req, res) {
        Featurer.create(req.body)
        .then( featurerList => { res.json(featurerList)})
        .catch(console.log)
    },

    updateLyricWithFeaturing(req, res) {
        Lyric.findByIdAndUpdate(req.body._id, {
            $set: {
                featuring: req.body.featuring
            }
        })
        .then( updatedLyric => res.json(updatedLyric))
        .catch(console.log)
    },

    checkTitleExist(req, res) {
        Lyric.find({$text: {$search: req.body.title}}, {score: {$meta: 'textScore'}})
        .sort({ score: { $meta: "textScore" } })
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'two', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'three', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'four', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'five', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'six', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'seven', model: 'Singer'}})
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
        Lyric.find({$text: {$search: req.params.term}}, {score: {$meta: 'textScore'}})
        .sort({ score: { $meta: "textScore" } })
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'two', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'three', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'four', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'five', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'six', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'seven', model: 'Singer'}})
        .then(lyricsSearched => {res.json(lyricsSearched)})
        .catch(console.log)
    },

    displayOneLyric(req, res) {
        console.log(req.body)
        Lyric.findOne({url: req.body.url})
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'two', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'three', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'four', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'five', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'six', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'seven', model: 'Singer'}})
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
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'two', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'three', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'four', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'five', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'six', model: 'Singer'}})
        .populate({path: 'featuring', populate: {path: 'seven', model: 'Singer'}})
        .then(top100Lyrics => {res.json(top100Lyrics)})
        .catch(console.log)
    },

    checkForSingerName(req, res) { // to moved to its own controller
        Singer.find({name: new RegExp(req.params.name, 'i')})
        .then(singerExist => {res.json(singerExist)})
        .catch(console.log)
    },

    createNewSinger(req, res) { // to moved to its own controller
        Singer.create(req.body)
        .then( singer => res.json(singer))
        .catch(console.log)
    },

    getSingerAlbum(req, res) {
        Album.find({singer: req.params.singerId})
        .then( album => {res.json(album)})
        .catch(console.log)
    }
}