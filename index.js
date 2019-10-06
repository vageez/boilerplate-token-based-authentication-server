// Main starting point of the appication
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router/routes')
const mongoose = require('mongoose')
const cors = require('cors')

// DB Set Up
mongoose.connect('mongodb://mongo:27017/mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// App Setup
// Logging to console framework
app.use(morgan('combined'))
// Will try to parse the incoming requests
// specifically to json, regardless of the type
app.use(bodyParser.json({ type: '*/*' }))
app.use(cors())
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)

console.log(`Server listening on port ${port}`)
