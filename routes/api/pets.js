const express = require('express');
const { check, validationResult } = require('express-validator');
const multer = require("multer");
const uuid = require('uuid').v4;

const DIR = './public';

const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Pet = require('../../models/Pet');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileValidationError = "Only .png, .jpg and .jpeg format allowed";
        }
    }
});

//@route POST api/pet
//Add or edit a pet 
//Access is private
router.post('/upload-a-pet', upload.single('image'), [
    auth, [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('type', 'Type is required')
            .not()
            .isEmpty(),
        check('breed', 'Breed is required')
            .not()
            .isEmpty(),
        check('age', 'Age is required')
            .not()
            .isEmpty(),
        check('location', 'Location is required')
            .not()
            .isEmpty()],
],
    async (req, res) => {
        const user = await User.findById(req.user.id).select('-password');
        const url = req.protocol + '://' + req.get('host')

        if (user.role !== 'ROLE_ADMIN') {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            if (req.fileValidationError) {
                return res.status(400).json({ errors: req.fileValidationError });
            }

            if (req.file === undefined) {
                return res.status(400).json({ errors: 'Please upload an image' });
            }

            let checkPet = await Pet.findOne({ user: req.user.id });

            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }


            const newPet = new Pet({
                name: req.body.name,
                type: req.body.type,
                age: req.body.age,
                location: req.body.location,
                breed: req.body.breed,
                image: url + '/public/' + req.file.filename,
                user: req.user.id
            });

            const pet = await newPet.save();

            res.json(pet);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

//@route GET api/pets
//Add a pet
//Access is private

router.get('/all', auth, async (req, res) => {
    try {
        const pets = await Pet.find().sort({ date: -1 });
        res.json(pets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/pets/:id
//Get post by id
//Access is private
router.get('/:id', auth, async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);

        if (!pet) {
            return res.status(404).json({ msg: "Pet not found" });
        }

        res.json(pet);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Pet not found" });
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;