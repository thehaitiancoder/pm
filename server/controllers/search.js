// Use this controller for anything search related - except for username

const Song = require('mongoose').model('Song');
const Album = require('mongoose').model('Album');
const Singer = require('mongoose').model('Singer');

module.exports = {
    // This provides search on the whole app
    generalSongSearch(req, res) {
        Song.find({$text: {$search: req.params.term}}, {score: {$meta: 'textScore'}})
        .sort({ score: { $meta: "textScore" } }).populate('singer').populate('album').populate('feat.singer')
        .then(songsSearched => {res.json(songsSearched)})
        .catch(console.log)
    },

    // Retrieve the top 100 songs per view
    getTop100Song(req, res) {
        Song.find().sort({views: 'desc'}).limit(parseInt(req.params.qty)).populate('singer').populate('album').populate('feat.singer')
        .then(top100Songs => {res.json(top100Songs)})
        .catch(console.log)
    },

    // Retrieve the albums of a particular artist on the lyric creation form
    getSingerAlbum(req, res) {
        Album.find({singer: req.params.singerId})
        .then( album => {
            res.json(album)
            console.log(album)
        })
        .catch(console.log)
    },

    getSingerProfile(req, res) {
        Singer.findOne({url: req.params.slug})
        .then( singerProfile => res.json(singerProfile))
        .catch(console.log)
    },

    getArtistTracks(req, res) {
        Song.find({singer: req.params.singerId}).populate('singer').populate('album').populate('feat.singer').limit(5)
        .then(artistTracks => {res.json(artistTracks)})
        .catch(console.log)
    },

    getArtistsInAlphabeticalOrder(req, res) {
        var nameStartWithThisLetter = new RegExp("^"+ req.params.letter, 'i');
        Singer.find({name: nameStartWithThisLetter})
        .then(artists => {res.json(artists)})
        .catch(console.log)
    }
}