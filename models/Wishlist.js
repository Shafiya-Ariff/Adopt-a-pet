const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WishlistSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

module.exports = Wishlist = mongoose.model('wishlist', WishlistSchema);