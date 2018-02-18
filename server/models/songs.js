const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeaturedArtistSchema = new Schema({
    singer: {
        type: Schema.Types.ObjectId,
        ref: 'Singer',
        required: true
    }
});

const SongSchema = new Schema({
    author: { // The user that submitted this Song
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lyrics: { // the actual lyrics
        type: String
    },
    singer: { // the main singer of the song
        type: Schema.Types.ObjectId,
        ref: 'Singer',
        required: true
    },
    feat: [FeaturedArtistSchema], // the artists collaborating on this son
    released_date: {
        type: Date
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    category: {
        type: String,
        enum: ['Rap', 'Konpa', 'Reggea', 'Levanjil', 'Rasin', 'Kanaval', 'Mond', 'Angaje', 'Twoubadou', 'Raboday']
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
    certified: { // meaning that the lyric is 100% correct
        type: Boolean,
        default: false
    },
    url: {
        type: String
    },
    views: {
        type: Number
    },
    clipart: {
        type: String
    }
}, {timestamps: true})

SongSchema.index({title: 'text'});
module.exports = mongoose.model('Song', SongSchema);