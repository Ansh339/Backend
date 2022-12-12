const mongoose = require('mongoose')

const signupSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    number: mongoose.Schema.Types.Number,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    newPassword: mongoose.Schema.Types.String
}

module.exports = mongoose.model('Signup', signupSchema)