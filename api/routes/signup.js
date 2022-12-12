const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Signup = require('../models/signup')

router.get('/', (req, res) => {
    Signup.find()
        .then(result => res.status(200).json( {message: "All Entries", Accounts: result}))
        .catch(err => res.status(500).json( {message: "Server Error", error: err}))
})

router.post('/', (req, res) => {
    const user = new Signup({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: req.body.password
    })

    Signup.find({email: req.body.email})
        .then( result=> {
            if(result.length === 0)
            {
                user.save()
                    .then(result => res.status(201).json( {message: "User Created", userDetails: result}))
                    .catch(error => res.status(500).json( {message: "Server Error", err: error}))
            }
            else
            {
                res.status(400).json({message: "Email Already Exists. Try with a different Email"})
            }
        })
})

module.exports = router;