import { regularUser } from "../models/regularUserModel.js";

class PersonalPlanController {
  static async addExerciseToPlan(req, res, next) {
    try {
      const { userId } = req.params;
      const exercise = req.body;

      const user = await regularUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.personalPlan.some((e) => e.name === exercise.name)) {
        return res.status(400).json({ error: 'Exercise already in the plan' });
      }

      user.personalPlan.push(exercise);
      await user.save();

      res.status(200).json({ personalPlan: user.personalPlan });
    } catch (err) {
      next(err)
    }
  }

  static async getPersonalPlan(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await regularUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ personalPlan: user.personalPlan });
    } catch (err) {
      next(err)
    }
  }

  static async removeExerciseFromPlan(req, res, next) {
    try {
      const { userId, exerciseName } = req.params;

      const user = await regularUser.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.personalPlan = user.personalPlan.filter((e) => e.name !== exerciseName);
      await user.save();

      res.status(200).json({ personalPlan: user.personalPlan });
    } catch (err) {
      next(err)
    }
  }
}

export { PersonalPlanController };
