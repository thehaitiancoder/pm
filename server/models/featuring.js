const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeaturingSchema = new Schema({
    lyric: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric',
        required: true
    },
    singer: {
        type: Schema.Types.ObjectId,
        ref: 'Singer',
        required: true
    },
    one : {
        type: Schema.Types.ObjectId,
        ref: 'Lyric',
        required: true
    },
    two: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    },
    three: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }, 
    four: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }, 
    five: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }, 
    six: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }, 
    seven: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric'
    }
}, {timestamps: true})

module.exports = mongoose.model('Featurer', FeaturingSchema);