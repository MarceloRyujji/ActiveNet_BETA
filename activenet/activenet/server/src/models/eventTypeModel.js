import mongoose from 'mongoose'

const eventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const EventType = mongoose.model('EventType', eventTypeSchema)

export default EventType
