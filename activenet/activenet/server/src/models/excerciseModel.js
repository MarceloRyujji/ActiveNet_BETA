import mongoose from 'mongoose'

const exercisePlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'The plan name is required'],
  },
  exercises: {
    type: Array, // Define el tipo de datos.
    default: [], // Valor predeterminado.
  },
})

const ExercisePlan = mongoose.model('ExercisePlan', exercisePlanSchema)

export { ExercisePlan, exercisePlanSchema }
