import express from 'express'
import signUpController from '../controllers/registerController.js'

const routes = express.Router()

routes.post('/signUp', signUpController.RegisterUser)

export default routes
