import EventType from '../models/eventTypeModel.js'

class EventTypeController {
  static async getAllEventTypes(req, res, next) {
    try {
      const eventTypes = await EventType.find()
      res.json(eventTypes)
    } catch (err) {
      res.status(500).json({ message: 'Error fetching event types' })
    }
  }
}

export default EventTypeController
