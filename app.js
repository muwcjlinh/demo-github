const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const router = require('./routes/index')
const mongoose = require('mongoose')
const config = require('./config/main')
const socketEvents = require('./events/socketEvents')

// Database connection
mongoose.connect(config.database)

// Start the server
const server = app.listen(config.port)
console.log('Your server is running on ' + config.port + '!!!')

const io = require('socket.io').listen(server)
socketEvents(io)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setting up basic middleware for all Express requests
app.use(logger('dev')) // Log requests to API using morgan

// app.get('/', function (req, res) {
//   res.send('Hello! The API is at http://localhost:' + config.port + '/api')
// })

router(app)

module.exports = app
