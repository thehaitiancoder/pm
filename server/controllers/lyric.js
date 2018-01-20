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
            if (lyric.soundcloud != null || lyric.youtube != null) {
                // Full credit
                if (lyric.soundcloud != null && lyric.youtube != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 7
                        }
                    })
                    .catch(console.log)
                    res.json(lyric)
                }
                // Credit for Soundcloud Link
                else if (lyric.soundcloud != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 6
                        }
                    })
                    .catch(console.log)
                    res.json(lyric)
                }
                // Credit for Youtube Link
                else if (lyric.youtube != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 6
                        }
                    })
                    .catch(console.log)
                    res.json(lyric)
                }
            }
            // Credit for lyric Only
            else {
                User.findByIdAndUpdate(req.body.author, {
                    $inc: {
                        balance_lyric_pending: 5
                    }
                })
                .catch(console.log)
                res.json(lyric)
            }
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
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
        .then(titleExist => {res.json(titleExist)})
        .catch(console.log)
    },

    getLoggedUserLyrics(req, res) { // Track submitted lyrics to pay users for submission
        Lyric.find({author: req.params.id}).sort({createdAt: 'desc'})
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
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
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
        .then(lyricsSearched => {res.json(lyricsSearched)})
        .catch(console.log)
    },

    displayOneLyric(req, res) {
        console.log(req.body)
        Lyric.findOne({url: req.body.url})
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
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
        console.log(req.body)
        Comments.create(req.body)
        .then(comment => {
            res.json(comment)
        })
        .catch(console.log)
    },

    getAllCommentsForActiveLyric(req, res) {
        // .sort({upvote: 'desc'}).sort({downvote: 'desc'})
        Comments.find({lyric: req.params.lyricId}).populate('user').sort('-createdAt')
        .then(theComments => { res.json(theComments) })
        .catch(console.log)
    },

    getTop100Lyric(req, res) {
        Lyric.find().sort({views: 'desc'}).limit(parseInt(req.params.qty))
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
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