const authController = require('../controllers/auth');
const songController = require('../controllers/song');
const commentController = require('../controllers/comment');
const singerController = require('../controllers/singer');
const searchController = require('../controllers/search');
const path = require('path');
const multer = require('multer');

// For image upload
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './src/assets/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//     }
// })

module.exports = function(app){
    app.post('/auth/login', authController.login);
    app.post('/auth/register', authController.register);
    app.delete('/auth/logout', authController.logout);
    app.get('/auth/usernamecheck/:username', authController.usernameCheck);
    app.get('/auth/userprofile/:id', authController.getLoggedUserProfile);
    app.put('/auth/login/reset', authController.reset);

    app.post('/lyrics/new', songController.addNewSong);
    app.post('/lyrics/featuring', songController.createFeaturing);
    app.put('/lyrics/featuring', songController.updateSongWithFeaturing);
    app.post('/lyrics/checktitle', songController.checkTitleExist);
    app.get('/lyrics/user/:id', songController.getLoggedUserSongs)
    app.post('/showlyrics/', songController.displayOneSong);
    
    app.get('/search/:term', searchController.generalSongSearch);
    app.get('/lyrics/top/:qty', searchController.getTop100Song);
    app.get('/my/api/album/:singerId', searchController.getSingerAlbum);

    app.post('/lyric/comments', commentController.addComment);
    app.get('/lyric/comments/:lyricId', commentController.getAllCommentsForActiveSong);
    // Reserved to LIKE and UNLIKE comment
    // app.put('/lyric/comments/votes', songController.voteCommentUpOrDown);

    app.get('/my/api/singer/:name', singerController.checkForSingerName);
    app.post('/my/api/singer/', singerController.createNewSinger);



    // app.post("/upload", multer({storage: storage}).array("uploads", 1), function(req, res) {
    //     res.send(req.files);
    // });

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    });
}