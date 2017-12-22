const Lyric = require('mongoose').model('Lyric');

module.exports = {
    addNewLyric(req, res){
        Lyric.create(req.body)
        .then(lyric => {
            res.json(lyric)
        })
        .catch(console.log)
    }
}