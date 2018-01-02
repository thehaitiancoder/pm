const mongoose = require('mongoose');
const { Schema } = mongoose;

const LyricSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    featurer: {one: String, two: String, three: String, four: String, Five: String, six: String, seven: String, eight: String, nine: String, ten: String},
    year: {
        type: Number
    },
    album: {
        type: String
    },
    category: {
        type: String,
        enum: ['Rap', 'Konpa', 'Reggea', 'Levanjil', 'Rasin', 'Kanaval', 'Mond']
    },
    soundcloud: {
        type: String
    },
    youtube: {
        type: String
    },
    /* Verification of the lyrics consist of the following steps
        1. Listen to the audio and read the lyric for accuracy
        2. if the lyric matched the words in the song at 90% marked it as verified */
    verified: {
        type: Boolean,
        default: false
    },
    verifier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    clipart: {
        type: String
    }
}, {timestamps: true})

LyricSchema.index({title: 'text'});
module.exports = mongoose.model('Lyric', LyricSchema);