const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Pet = require('../../models/Pet');
const Wishlist = require('../../models/Wishlist');

//@route POST api/wishlist
// Post to wishlist
// Access is private
router.post('/:petId', auth, async (req, res) => {
    try {
        const wishlistFields = {};

        const check = await Wishlist.find({user: req.user.id,pet: req.params.petId});
        if(check.length > 0){
            return res.status(404).json({ msg: "Already in wishlist!" });
        }

        wishlistFields.user = req.user.id
        wishlistFields.pet = req.params.petId

        const newWishlist = new Wishlist(wishlistFields);

        const wishlist = await newWishlist.save();

        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/wishlist
// Get wishlist collection by user id
// Access is private
router.get('/', auth, async (req, res) => {
    try {
        const wishlist = await Wishlist.find({user: req.user.id}).populate('pet');
        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;