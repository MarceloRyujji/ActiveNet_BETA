import mongoose from 'mongoose'

const accountTypes = ['user', 'trainer']

const usersSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    firstName: {
      type: String,
      required: [true, 'Please inform your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please inform your last name'],
    },
    email: { type: String, required: [true, 'Please inform your e-mail'] },
    password: { type: String, required: [true, 'Please inform your password'] },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please inform your date of birth'],
    },
    accountType: {
      type: String,
      enum: accountTypes,
      required: [true, 'Please choose a type of account'],
    },
    profilePicture: {
      type: String,
      default: '/public/default-profile.jpg',
    },
    specialties: {
      type: [String],
      required: function() { return this.accountType === 'trainer'; }, //only for trainers
      default: '', // can be empty 
    },
  },
  { versionKey: false }
)

const users = mongoose.model('users', usersSchema)

export { users, usersSchema }
