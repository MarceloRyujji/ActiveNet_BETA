import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  muscle: { type: String, required: true },
  difficulty: { type: String, required: true },
  equipment: { type: String },
  instructions: { type: String },
});

const personalPlan = mongoose.model('personalPlan', exerciseSchema);

export { personalPlan, exerciseSchema };