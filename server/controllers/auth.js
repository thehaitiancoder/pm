const User = require('mongoose').model('User');
const tokenGenerator = require('uuid-token-generator');
const nodemailer = require('nodemailer');

module.exports = {
    login(req, res){
        User.findOne({ email: req.body.email })
        .then((user) => {
            // Contidions needed to exit the then() if user is null
            if(!user) { 
                throw new Error();
            }
            return User.validatePassword(req.body.password, user.password)
            .then((result) => { // remember to always accept the result of the promise
                //handle login
                if (result === true){
                    completeLogin(req, res, user);
                }
                else if (result === false) {
                    res.status(401).json('Email oubyen mokle ou gen yon erè! Verifye yo epi eseye ankò'); // The error sent back means: email/password comb does not exist
                }
            })
        })
        .catch(error => { // Executes when no user is found
            res.status(401).json('Email oubyen mokle ou gen yon erè! Verifye yo epi eseye ankò');
        })
    },
    register(req, res){
        User.create(req.body)
        .then(user => {
            //handle login
            completeLogin(req, res, user);

            // Send a confirmation email to the registred user
            sendEmail(user);
        })
        .catch(error => {
            // res.status(422).json(Object.keys(error.errors).map(key => error.errors[key].message))
            res.status(422).json(Object.keys(error.errors))
            console.log(Object.keys(error.errors))
            console.log(error)
        })
    },
    logout(req, res){
        console.log('logging out');
        req.session.destroy();
        res.clearCookie('userId');
        res.clearCookie('expiration');
        res.json(true);

    },

    reset(req, res) {
        const now = Date.now()
        const resetToken = new tokenGenerator(256, tokenGenerator.BASE62);
        const token = resetToken.generate()

        User.findOneAndUpdate({email: req.body.email}, {
            $set: {
                timeResetSent: now,
                pwdResetToken: token
            }
        })
        .then(user => {
            if (user) {
                res.status(200).json('Nou voye yon email ba ou ak enfomasyon pou w ka chanje mokle ou. Email sa valid pou 60 minit.')
                sendResetEmail(user, token); // Send a reset email to the 
            }
            else {
                res.status(401).json('noUser')
            }
        })
    },

    // checking for the availability of a user on signing
    usernameCheck(req, res){
        User.findOne({username: req.params.username})
        .then(user => res.json(user.username))
        .catch(err => res.json(err))
    },

    getLoggedUserProfile(req, res){
        User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(console.log)
    }
}

function completeLogin(req, res, user){
    console.log('Completing login');

    req.session.user = user.toObject();

    delete req.session.user.password;

    res.cookie('userId', user._id.toString());
    res.cookie('expiration', Date.now() + 86400 * 10000);

    res.json(user);
}

function sendEmail(user) {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'hello@pawolmizik.com', // generated ethereal user
                pass: "edre45g'eyushew;'s53d;t"  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PawolMizik.com" <hello@pawolmizik.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Byenvini sou Pawolmizik', // Subject line
            text: '', // plain text body
            html: `<p>Bonswa ${user.username},</p>&nbsp;<p>Mesi paske ou enskri sou PawolMizik.</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Ekip PawolMizik</p>` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

function sendResetEmail(user, resetToken) {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'hello@pawolmizik.com', // generated ethereal user
                pass: "edre45g'eyushew;'s53d;t"  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PawolMizik.com" <hello@pawolmizik.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: 'Chanje mokle Pawolmizik ou', // Subject line
            text: '', // plain text body
            html: `<p>Bonswa ${user.username},</p><p>Nou resevwa demand ou pou chanje mokle ou sou PawolMizik.com</p><p><a href="http://www.pawolmizik.com/reset-pwd/${resetToken}">Klike la pou kreye yon lot mokle</a></p><p>Ekip PawolMizik</p>` // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}