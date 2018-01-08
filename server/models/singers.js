const mongoose = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');
const { Schema } = mongoose;

const SingerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    profil_pic : {
        type: String
    }
}, { timestamps: true})

SingerSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});
SingerSchema.index({name: 'text'});
module.exports = mongoose.model('Singer', SingerSchema);