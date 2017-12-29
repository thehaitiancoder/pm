const mongoose          = require('mongoose');
const bcrypt            = require('bcrypt');
const validator         = require('validator');
const uniqueValidator   = require('mongoose-unique-validator');
const { Schema }        = mongoose;

const UserSchema        = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
        validator(value) {
            return validator.isEmail(value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value, cb){
                /*  The pwd needs to be:
                    - 8 characters minimu
                    - includes at least 1 lowercase letter
                    - inludes at least 1 uppercase letter */
                const pwdReg = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
                cb(pwdReg.test(value))
            }
        },
    },
    phone: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    role: {
        // Roles ranged from 0 to 100 with steps of 10 while 0 is for all users and 100 is for admin
        type: Number,
        default: 0
    },
    balance_lyric_final: {
        type: Number,
        default: 0
    },
    balance_lyric_pending: {
        type: Number,
        default: 0
    }

    
}, { timestamps: true})

UserSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

UserSchema.statics.validatePassword = function(candidatePassword, hashedPassword){
    return bcrypt.compare(candidatePassword, hashedPassword);
};

UserSchema.pre('save', function(next){
    if (!this.isModified('password')) { return next };

    bcrypt.hash(this.password, 10)
        .then(hashed =>{
            this.password = hashed;

            next();
        })
        .catch(next)
});

module.exports = mongoose.model('User', UserSchema);