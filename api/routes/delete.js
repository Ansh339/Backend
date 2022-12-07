const express = require('express')
const router = express.Router()

const Signup = require('../models/signup')

router.delete('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    Signup.find({email: userEmail})
        .then(result => {
            if(result.length === 0)
            {
                res.status(400).json({message: 'User does Not Exist'})
            }
            else
            {
                if(result[0].password === userPassword)
                {   
                    Signup.remove({_id: result[0]._id})
                    .then(updatedResult => res.status(200).json( {message: 'User Deleted', update: updatedResult} ) )
                    .catch(err => res.status(500).json( {message: 'Error occured in the DB', err: err} ))
                }
                else
                {
                    res.status(401).json({message: 'Authentication Failed'})
                }
            }
        })
        .catch(err => res.status(500).json({message: "Server Error", error: err}))
})

module.exports = router