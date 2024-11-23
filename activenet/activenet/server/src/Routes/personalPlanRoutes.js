import express from 'express';
import { PersonalPlanController } from '../controllers/personalPlanController.js';

const router = express.Router();

router.post('/:userId/ExercisePersonalPlan', PersonalPlanController.addExerciseToPlan);
router.get('/:userId/ExercisePersonalPlan', PersonalPlanController.getPersonalPlan);
router.delete('/:userId/ExercisePersonalPlan/:exerciseName', PersonalPlanController.removeExerciseFromPlan);

export default router;
