const mongoose = require('mongoose');
const { Schema } = mongoose;

const UpvoteSchema = new Schema({
    user: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Upvote', UpvoteSchema);