const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
  console.log(url)
})


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)
app.use(middleware.errorHandler)

module.exports = app