import express from 'express'
import ExercisesApiController from '../controllers/exercisesApiController.js'

const router = express.Router()

router.get('/api/exercises', ExercisesApiController.fetchExercises)

export default router
