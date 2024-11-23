import express from 'express'
import connectOnDB from './config/connectOnDB.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import routes from './Routes/index.js'
import errorHandle from './middlewares/errorHandle.js'
import handle404 from './middlewares/handle404.js'
import mainPicture from './middlewares/profilePicture.js'

const app = express()

await connectOnDB()

mongoose.connection.on('error', (err) => {
  console.error('Connection Error', err)
})

mongoose.connection.once('open', () => {
  console.log('Database connection established successfully')
})

app.use(express.json())

//middleware for access picture
mainPicture(app)
// Using defined routes
routes(app)

// Error handling
app.use(handle404)
app.use(errorHandle)

export default app
