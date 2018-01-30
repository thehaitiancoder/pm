const Singer = require('mongoose').model('Singer');

module.exports = {
    checkForSingerName(req, res) { 
        Singer.find({name: new RegExp(req.params.name, 'i')})
        .then(singerExist => {res.json(singerExist)})
        .catch(console.log)
    },

    createNewSinger(req, res) { 
        Singer.create(req.body)
        .then( singer => res.json(singer))
        .catch(console.log)
    }
}