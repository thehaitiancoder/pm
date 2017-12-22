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


    // app.post("/upload", multer({storage: storage}).array("uploads", 1), function(req, res) {
    //     res.send(req.files);
    // });

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    });
}