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

SingerSchema.index({name: 'text'});
module.exports = mongoose.model('Singer', SingerSchema);