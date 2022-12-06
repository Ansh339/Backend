const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())

mongoose.connect(`mongodb+srv://Ansh339:Ansh2002@cluster0.9j2diyw.mongodb.net/Users?retryWrites=true&w=majority`)
    .then(() => console.log('CONNECTION SUCCESSFUL!'))
    .catch(() => console.log('CONNECTION FAILED!'))

app.use(bodyParser.urlencoded( {extended:false} ))
app.use(bodyParser.json())

const signupRoutes = require('./api/routes/signup')
const loginRoutes = require('./api/routes/login')
const updateRoutes = require('./api/routes/update')
const deleteRoutes = require('./api/routes/delete')

app.use('/users/signup', signupRoutes)
app.use('/users/login', loginRoutes)
app.use('/users/update', updateRoutes)
app.use('/users/delete', deleteRoutes)

app.use( (req, res) => {
    res.status(404).json({message: 'Seems like You are Lost, Resource Not Found!'})
} )

module.exports = app;