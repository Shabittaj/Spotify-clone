const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const authSchema = require('../models/authSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


router.post('/signup', async (req, res) => {

    //CREATING A HASH FOR PASSWORD
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);


    const auth = new authSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: secPass
        // password: req.body.password
    })
    try {
        const details = await auth.save()
        res.json({ "details": details });

    } catch (error) {
        res.json({ "error": error })

    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authSchema.findOne({ email });
        if (!user) {
            return res.json({ error: "User not found" })
        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: email,
                pass: password
            }

            // const expireToken = "1h";

            const token = jwt.sign(payload, process.env.JWT_SECRET,/* { expireToken } */);
            if (res.status(201)) {
                return res.json({ status: "ok", token: token })
            } else {
                return res.json({ status: "error", error: "Invalid Password" });
            }
        } else {
            res.json({ error: "Password invalid" });
        }
    } catch (error) {
        res.json({ "error": error })
    }
})


router.post('/user', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const useremail = user.email;
        authSchema.findOne({ email: useremail }).then((Data) => {
            res.send({ status: "ok", data: Data, token: token })
        })
    } catch (error) {
        console.log(error);
        res.json({ error: error });
    }
})



router.get('/', async (req, res) => {
    try {
        const details = await authSchema.find()
        res.json({ "details": details })
    } catch (error) {
        res.json({ "error": error })
    }
})


router.get('/:firstName', async (req, res) => {
    console.log(req.params.firstName);
    try {
        const details = await authSchema.findOne({ firstName: req.params.firstName })
        res.json({ "details": details })
    } catch (error) {
        res.json({ "error": error })
    }
})

module.exports = router