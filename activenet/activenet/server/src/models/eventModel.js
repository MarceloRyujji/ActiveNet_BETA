import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The event must have a title.'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    country: {
      type: String,
      required: [true, 'The country is required.'],
    },
    city: {
      type: String,
      required: [true, 'The city is required.'],
    },
    address: {
      type: String,
      required: [true, 'The address is required.'],
    },
    postalCode: {
      type: String,
      required: [true, 'The postal code is required.'],
    },
  },
  eventType: {
    type: String,
    required: [true, 'The event type is required.'],
  },
  dateTime: {
    type: Date,
    required: [true, 'The event date and time are required.'],
    validate: {
      validator: function (value) {
        return value > Date.now()
      },
      message: 'The event date and time must be in the future.',
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The event must have a creator.'],
  },
  goCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Event = mongoose.model('Event', eventSchema)

export default Event
