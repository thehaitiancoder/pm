const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    lyric: {
        type: Schema.Types.ObjectId,
        ref: 'Lyric',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
        validator(value) {
            return validator.isEmail(value)
            }
        }
    },
    content: {
        type: String
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema);