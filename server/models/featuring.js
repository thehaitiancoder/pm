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
        ref: 'Singer',
        required: true
    },
    two: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    },
    three: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    }, 
    four: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    }, 
    five: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    }, 
    six: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    }, 
    seven: {
        type: Schema.Types.ObjectId,
        ref: 'Singer'
    }
}, {timestamps: true})

module.exports = mongoose.model('Featurer', FeaturingSchema);