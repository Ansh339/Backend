const express = require('express')
const router = express.Router()

const Signup = require('../models/signup')

router.patch('/', (req, res) => {
    const userEmail = req.body.email
    const userOldPassword = req.body.password
    const userNewPassword = req.body.newPassword

    Signup.find({email: userEmail})
        .then(result => {
            if(result.length === 0)
            {
                res.status(400).json({message: 'User does Not Exist'})
            }
            else
            {
                if(result[0].password === userOldPassword)
                {
                    if(userNewPassword === userOldPassword)
                    {res.status(400).json({message: 'Enter a New Password to Update'})}
                    else
                    {
                        updatedUser = {
                            _id: result[0]._id,
                            email: result[0].email,
                            password: userNewPassword
                        }
    
                        Signup.findByIdAndUpdate(result[0]._id, updatedUser)
                        .then(updatedResult => res.status(200).json( {message: 'User Details Updated', update: updatedResult} ) )
                        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))
                    }
                }
                else
                {
                    res.status(400).json({message: 'Authentication Failed'})
                }
            }
        })
        .catch(err => res.status(500).json({message: "Server Error", error: err}))
})

module.exports = router