const express = require('express');
const { check, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');

const router = express.Router();
const auth = require('../../middleware/auth');
const Adopt = require('../../models/Adopt');

//@route POST api/adopt
// Post to adopt
// Access is private
router.post('/:petId', auth, async (req, res) => {
    try {
        const adoptFields = {};

        adoptFields.user = req.user.id;
        adoptFields.pet = req.params.petId;

        const check = await Adopt.find({user: req.user.id,pet: req.params.petId});
        if(check.length > 0){
            return res.status(404).json({ msg: "We have already sent you a mail for further instructions!" });
        }

        const newAdopt = new Adopt(adoptFields);

        const adopt = await newAdopt.save();

        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "72fb344a2e62c9",
                pass: "c0a9ef4eac5482"
            }
        });

        const user = await User.findById(req.user.id).select('-password');

        var mailOptions = {
            from: 'adopt-a-pet@gmail.com',
            to: user.email,
            subject: 'Adopt a pet',
            text: 'That was easy!'
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json(adopt);
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
        const wishlist = await Wishlist.find({ user: req.user.id }).populate('pet');
        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;