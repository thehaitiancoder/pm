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
    featurer: [{one: String, two: String, three: String, four: String, five: String}],
    year: {
        type: Number
    },
    album: {
        type: String
    },
    category: {
        type: String,
        enum: ['Rap', 'Konpa', 'Reggea', 'Levanjil', 'Rasin', 'kanaval']
    },
    soundcloud: {
        type: String
    },
    youtube: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Lyric', LyricSchema);