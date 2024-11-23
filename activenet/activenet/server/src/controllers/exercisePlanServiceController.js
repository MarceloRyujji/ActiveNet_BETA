import { ExercisePlan } from '../models/excerciseModel.js'
import mongoose from 'mongoose'

class ExercisePlanService {
  async createPlan(req, res, next) {
    try {
      const userId = req.user.id
      const { name } = req.body

      // Validate input
      if (!userId || !name) {
        return res
          .status(400)
          .json({ message: 'Missing required fields: userId or name' })
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId format' })
      }

      if (name.trim() === '') {
        return res.status(400).json({ message: 'Plan name cannot be empty' })
      }

      // Create the plan
      const newPlan = await ExercisePlan.create({
        userId,
        name,
        exercises: [],
      })

      return res.status(201).json({
        message: 'Plan created successfully',
        plan: newPlan,
      })
    } catch (err) {
      console.error('Error creating plan:', err)
      next(err)
    }
  }

  async getPlans(req, res, next) {
    try {
      const userId = req.user.id

      const userPlans = await ExercisePlan.find({ userId })

      if (!userPlans.length) {
        return res.status(404).json({ message: 'No plans found for this user' })
      }

      return res.status(200).json({ plans: userPlans })
    } catch (error) {
      console.error('Error fetching plans:', error)
      next(error)
    }
  }

  async updatePlan(req, res, next) {
    try {
      const { planId, exercise } = req.body

      if (!mongoose.Types.ObjectId.isValid(planId)) {
        return res.status(400).json({ message: 'Invalid plan ID format' })
      }

      const plan = await ExercisePlan.findById(planId)

      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' })
      }

      if (Array.isArray(exercise)) {
        plan.exercises.push(...exercise)
      } else {
        plan.exercises.push(exercise)
      }

      const updatedPlan = await plan.save()

      return res.status(200).json({
        message: 'Plan updated successfully',
        plan: updatedPlan,
      })
    } catch (error) {
      console.error('Error updating plan:', error)
      next(error)
    }
  }

  async deletePlan(req, res, next) {
    try {
      const { planId } = req.body

      if (!planId) {
        return res.status(400).json({ message: 'Plan ID is required' })
      }

      if (!mongoose.Types.ObjectId.isValid(planId)) {
        return res.status(400).json({ message: 'Invalid plan ID format' })
      }

      const deletedPlan = await ExercisePlan.findByIdAndDelete(planId)

      if (!deletedPlan) {
        return res.status(404).json({ message: 'Plan not found' })
      }

      return res.status(200).json({ message: 'Plan deleted successfully' })
    } catch (error) {
      console.error('Error deleting plan:', error)
      next(error)
    }
  }

  async deleteExercise(req, res, next) {
    try {
      const { exerciseName, planName } = req.body

      if (!exerciseName || !planName) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const updatedPlan = await ExercisePlan.findOneAndUpdate(
        { name: planName },
        { $pull: { exercises: { name: exerciseName } } },
        { new: true }
      )

      if (!updatedPlan) {
        return res.status(404).json({ message: 'Plan or exercise not found' })
      }

      return res.status(200).json({
        message: 'Exercise deleted successfully',
        updatedPlan,
      })
    } catch (error) {
      console.error('Error deleting exercise:', error)
      next(error)
    }
  }
}

export default new ExercisePlanService()
