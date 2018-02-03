// Use this controller for anything search related - except for username

const Song = require('mongoose').model('Song');
const Album = require('mongoose').model('Album');

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
        .then( album => {res.json(album)})
        .catch(console.log)
    }
}