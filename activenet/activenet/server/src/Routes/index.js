import users from './regularUserRoutes.js'
import eventRoutes from './eventRoutes.js'
import trainers from './trainersRoutes.js'
import signUp from './signUpRoute.js'
import login from './loginRoute.js'
import exercises from './exerciseRoutes.js'
import ForgetPassword from './passwordRecoveryRoute.js'
import Profile from './profileRoutes.js'
import countryRoutes from './countryRoutes.js'
import cityRoutes from './cityRoutes.js'
import postalCodeRoutes from './postalCodeRoutes.js'
import eventTypeRoutes from './eventTypeRoutes.js'
import express from 'express'
import openai from './openAiRoutes.js'
import cors from 'cors'
import authRoutes from './authRoutes.js'
import exercisePlanRoutes from './exercisePlanRoutes.js'
const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204, // for older browsers
}

const routes = (app) => {
  app
    .route('/')
    .get((req, res) => res.status(200).send('Welcome to the ActiveNet'))
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
  app.use(
    express.json(),
    users,
    eventRoutes,
    trainers,
    signUp,
    login,
    ForgetPassword,
    exercises,
    Profile,
    authRoutes,
    openai,
    countryRoutes,
    cityRoutes,
    postalCodeRoutes,
    eventTypeRoutes,
    exercisePlanRoutes
  )
}

export default routes
