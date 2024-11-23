import axios from 'axios'
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

class ExercisesApiController {
  static async fetchExercises(req, res, next) {
    try {
      const { name, type, muscle, difficulty } = req.query

      // Validate required query parameters
      if (!name && !type && !muscle && !difficulty) {
        return res.status(400).json({
          message:
            'At least one parameter (name, type, muscle, difficulty) is required',
        })
      }

      const response = await axios.get(API_URL, {
        headers: { 'X-Api-Key': API_KEY },
        params: { name, type, muscle, difficulty },
      })

      // Check if the response contains the expected data structure
      if (!Array.isArray(response.data) || response.data.length === 0) {
        return res.status(200).json({
          message: `No exercises found for the provided parameters: name=${name}, type=${type}, muscle=${muscle}, difficulty=${difficulty}.`,
        })
      }

      return res.status(200).json(response.data)
    } catch (err) {
      console.error('Error fetching exercises:', err.message)
      next(err) // Pass the error to the error-handling middleware
    }
  }
}

export default ExercisesApiController
