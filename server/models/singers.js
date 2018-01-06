const mongoose = require('mongoose');
const { Schema } = mongoose;

const SingerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    profil_pic : {
        type: String
    }
}, { timestamps: true})

module.exports = mongoose.model('Singer', SingerSchema);