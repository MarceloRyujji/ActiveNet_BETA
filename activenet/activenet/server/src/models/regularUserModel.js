import mongoose from 'mongoose'
import { date } from 'yup'

const regularUserSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', "Don't want to inform"],
    },
    accountType: {
      type: String,
    },
    experience: { type: Number },
    city: {
      type: String,
    },
    availableHours: {
      type: String,
    },
    dateOfBirth: { type: Date },
    age: {
      type: Number,
      min: [18, '{VALUE} not allowed, minimum age: 18'],
      max: [100, '{VALUE} not allowed, maximum age: 100'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    specialties: {
      type: String,
    },
    profilePicture: { type: String, default: '/public/default-profile.jpg' },
    biography: {
      type: String,
    },
    socialMediaLinks: { type: Map, of: String },
  },
  { versionKey: false }
)

const regularUser = mongoose.model('user', regularUserSchema)

export { regularUser, regularUserSchema }
