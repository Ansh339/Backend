const express = require('express')
const router = express.Router()

const Signup = require('../models/signup')

router.get('/', (req, res) => {
    res.status(200).json( {message: 'GET request to /users/login'})
})

router.get('/:userId', (req, res) => {
    res.status(200).json( {message: `GET request for /users/login/${req.params.userId}`})
})

router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    Signup.find({email: userEmail})
    .then(result => {
        if(result.length === 0)
        {res.status(400).json({message: "User does not Exist"})}
        else
        {
            if(result[0].password === userPassword)
            {res.status(200).json({message: "You have Successfully Logged In"})}
            else
            {res.status(400).json({message: "Email or Password is Wrong"})}
        }
    })
    .catch(error => res.status(500).json( {message: "Database Error", err: error}))
    // Signup.find()
    // .then(result => {
    //     const userNames = []
    //     for(let i = 0; i < result.length; i++)
    //     {
    //         if(userEmail === result[i].email && userPassword === result[i].password)
    //         {
    //             userNames.push(result[i].email)
    //             userNames.push(result[i].password)
    //             res.status(200).json( {message: "You have Successfully Logged IN", entries: userNames})
    //         }

    //     }
    //     res.status(400).json( {message: "Email or Password is Wrong"})
    // })
    // .catch(error => res.status(500).json( {message: "Database Error", err: error}))
})

module.exports = router;