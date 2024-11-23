import express from 'express'
import authenticateToken from '../middlewares/authenticateToken.js'
import ExercisePlanServiceController from '../controllers/exercisePlanServiceController.js'

const router = express.Router()

router.post(
  '/db/exercisesPlan',
  authenticateToken,
  ExercisePlanServiceController.createPlan
)

router.get(
  '/db/exercisesPlan',
  authenticateToken,
  ExercisePlanServiceController.getPlans
)

router.put('/db/exercisesPlan', ExercisePlanServiceController.updatePlan)

router.delete('/db/exercisesPlan', ExercisePlanServiceController.deletePlan)

router.delete('/db/exercises', ExercisePlanServiceController.deleteExercise)

export default router
