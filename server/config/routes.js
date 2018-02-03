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
    const api = '/pm/api/';
    app.post('/auth/login', authController.login);
    app.post('/auth/register', authController.register);
    app.delete('/auth/logout', authController.logout);
    app.get('/auth/usernamecheck/:username', authController.usernameCheck);
    app.get('/auth/userprofile/:id', authController.getLoggedUserProfile);
    app.put('/auth/login/reset', authController.reset);

    app.post(api + 'lyrics/new', songController.addNewSong);
    app.post(api + 'lyrics/checktitle', songController.checkTitleExist);
    app.get(api + 'lyrics/user/:id', songController.getLoggedUserSongs);
    /*  The following call should have been a Get req, but instead is a POST because the 
        lyric is to be retrieved using a slug, thus passing the slug with the url would cause
        some issues due to some unicodes in the slugs */
    app.post(api + 'showlyrics', songController.displayOneSong);
    
    app.get( api + 'search/:term', searchController.generalSongSearch);
    app.get( api + 'lyrics/top/:qty', searchController.getTop100Song);
    app.get( api + 'album/:singerId', searchController.getSingerAlbum);

    app.post(api + 'lyric/comments', commentController.addComment);
    app.get( api + 'lyric/comments/:lyricId', commentController.getAllCommentsForActiveSong);

    app.get(api + 'singer/:name', singerController.checkForSingerName);
    app.post(api + 'singer', singerController.createNewSinger);



    // app.post("/upload", multer({storage: storage}).array("uploads", 1), function(req, res) {
    //     res.send(req.files);
    // });

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    });
}