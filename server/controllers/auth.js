const User = require('mongoose').model('User');

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
            })
        })
        .catch(error => { // Executes when no user is found
            res.status(401).json('email/password comb does not exist');
        })
    },
    register(req, res){
        User.create(req.body)
        .then(user => {
            //handle login
            completeLogin(req, res, user);
        })
        .catch(error => {
            // res.status(422).json(
            //     Object.keys(error.errors).map(key => error.errors[key].message)
            // )
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

    // checking for the availability of a user on signing
    usernameCheck(req, res){
        User.findOne({username: req.params.username})
        .then(user => res.json(user.username))
        .catch(err => res.json(err))
    },

    getLoggedUserProfile(req, res){
        console.log(req.params.id)
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