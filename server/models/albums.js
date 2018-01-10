const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlbumSchema = new Schema({
    singer: {
        type: Schema.Types.ObjectId,
        ref: 'Singer',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    released_date: {
        type: Date
    },
    cover: {
        type: String
    }
}, { timestamps: true})

AlbumSchema.index({name: 'text'});
module.exports = mongoose.model('Album', AlbumSchema);