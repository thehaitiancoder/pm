const Comments = require('mongoose').model('Comment');
const comments = new Comments;

module.exports = {
    addComment(req, res) {
        console.log(req.body)
        Comments.create(req.body)
        .then(comment => {
            res.json(comment)
        })
        .catch(console.log)
    },

    getAllCommentsForActiveSong(req, res) {
        // .sort({upvote: 'desc'}).sort({downvote: 'desc'})
        Comments.find({song: req.params.lyricId}).populate('user').sort('-createdAt')
        .then(theComments => { res.json(theComments) })
        .catch(console.log)
    },
}