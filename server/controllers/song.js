const Song = require('mongoose').model('Song');
const Featurer = require('mongoose').model('Featurer');
const User = require('mongoose').model('User');
const Album = require('mongoose').model('Album');

module.exports = {
    addNewSong(req, res){
        console.log(req.body)
        Song.create(req.body)
        .then(song => {
            // Give the user credits for the added song
            if (song.soundcloud != null || song.youtube != null) {
                // Full credit
                if (song.soundcloud != null && song.youtube != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 7
                        }
                    })
                    .catch(console.log)
                    res.json(song)
                }
                // Credit for Soundcloud Link
                else if (song.soundcloud != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 6
                        }
                    })
                    .catch(console.log)
                    res.json(song)
                }
                // Credit for Youtube Link
                else if (song.youtube != null) {
                    User.findByIdAndUpdate(req.body.author, {
                        $inc: {
                            balance_lyric_pending: 6
                        }
                    })
                    .catch(console.log)
                    res.json(song)
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
                res.json(song)
            }
        })
        .catch(console.log)
    },

    createFeaturing(req, res) {
        Featurer.create(req.body)
        .then( featurerList => { res.json(featurerList)})
        .catch(console.log)
    },

    updateSongWithFeaturing(req, res) {
        Song.findByIdAndUpdate(req.body._id, {
            $set: {
                featuring: req.body.featuring
            }
        })
        .then( updatedSong => res.json(updatedSong))
        .catch(console.log)
    },

    checkTitleExist(req, res) {
        Song.find({$text: {$search: req.body.title}}, {score: {$meta: 'textScore'}})
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

    getLoggedUserSongs(req, res) { // Track submitted lyrics to pay users for submission
        Song.find({author: req.params.id}).sort({createdAt: 'desc'})
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
        .then(loggedUserSongs => {
            console.log(loggedUserSongs)
            res.json(loggedUserSongs)})
        .catch(console.log)
    },

    displayOneSong(req, res) {
        console.log(req.body)
        Song.findOne({url: req.body.url})
        .populate('singer')
        .populate('album')
        .populate({path: 'featuring', populate: {path: 'one'}})
        .populate({path: 'featuring', populate: {path: 'two'}})
        .populate({path: 'featuring', populate: {path: 'three'}})
        .populate({path: 'featuring', populate: {path: 'four'}})
        .populate({path: 'featuring', populate: {path: 'five'}})
        .populate({path: 'featuring', populate: {path: 'six'}})
        .populate({path: 'featuring', populate: {path: 'seven'}})
        .then(songToDisplay => {
            // Increase the view for this song
            Song.findByIdAndUpdate(songToDisplay._id, {
                $inc: {
                    views: 1
                }
            })
            .catch(console.log)
            res.json(songToDisplay)
        })
        .catch(console.log)
    }
}