const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

module.exports = Pet = mongoose.model('pet', PetSchema);