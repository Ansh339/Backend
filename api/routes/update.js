const express = require('express')
const router = express.Router()

const Signup = require('../models/signup')

router.patch('/', (req, res) => {
    const userEmail = req.body.email
    const userName = req.body.name
    const userNumber = req.body.number
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
                    {res.status(401).json({message: 'Enter a New Password to Update'})}
                    else
                    {
                        if(userNewPassword === '')
                        {
                            updatedUser = {
                                _id: result[0]._id,
                                email: result[0].email,
                                name: userName,
                                number: userNumber,
                                password: result[0].password
                            }
                        }
                        else
                        {
                            updatedUser = {
                                _id: result[0]._id,
                                email: result[0].email,
                                name: userName,
                                number: userNumber,
                                password: userNewPassword
                            }
                        }
    
                        Signup.findByIdAndUpdate(result[0]._id, updatedUser)
                        .then(updatedResult => res.status(200).json( {message: 'User Details Updated', update: updatedResult} ) )
                        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))
                    }
                }
                else
                {
                    res.status(402).json({message: 'Authentication Failed'})
                }
            }
        })
        .catch(err => res.status(500).json({message: "Server Error", error: err}))
})

module.exports = router