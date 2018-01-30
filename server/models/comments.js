const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const UpvoteSchema = new Schema({user: String});
const DownvoteSchema = new Schema({user: String});

const CommentSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
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
    upvote: [UpvoteSchema],
    downvote: [DownvoteSchema]
}, {timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema);