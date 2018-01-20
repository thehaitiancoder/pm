const authController = require('../controllers/auth');
const lyricController = require('../controllers/lyric');
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

    app.post('/lyrics/new', lyricController.addNewLyric);
    app.post('/lyrics/featuring', lyricController.createFeaturing);
    app.put('/lyrics/featuring', lyricController.updateLyricWithFeaturing);
    app.get('/my/api/album/:singerId', lyricController.getSingerAlbum);
    app.post('/lyrics/checktitle', lyricController.checkTitleExist);
    app.get('/lyrics/user/:id', lyricController.getLoggedUserLyrics)
    app.get('/search/:term', lyricController.generalLyricSearch);
    app.post('/showlyrics/', lyricController.displayOneLyric);
    app.get('/lyrics/top/:qty', lyricController.getTop100Lyric);

    app.post('/lyric/comments', lyricController.addComment);
    app.get('/lyric/comments/:lyricId', lyricController.getAllCommentsForActiveLyric);
    // Reserved to LIKE and UNLIKE comment
    // app.put('/lyric/comments/votes', lyricController.voteCommentUpOrDown);

    app.get('/my/api/singer/:name', lyricController.checkForSingerName);
    app.post('/my/api/singer/', lyricController.createNewSinger);



    // app.post("/upload", multer({storage: storage}).array("uploads", 1), function(req, res) {
    //     res.send(req.files);
    // });

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    });
}