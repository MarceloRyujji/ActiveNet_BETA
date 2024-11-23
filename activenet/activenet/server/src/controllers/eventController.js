import Event from '../models/eventModel.js'
import { regularUser } from '../models/regularUserModel.js'

class EventController {
  async createEvent(req, res) {
    try {
      const { title, description, location, eventType, dateTime } = req.body
      const user = await regularUser.findById(req.user.id)
      if (!user) return res.status(404).json({ message: 'User not found' })

      const newEvent = new Event({
        title,
        description,
        location,
        eventType,
        dateTime,
        createdBy: user._id,
      })

      const savedEvent = await newEvent.save()
      res.status(201).json({ success: true, event: savedEvent })
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  }

  async getAllEvents(req, res) {
    try {
      const events = await Event.find().sort({ dateTime: 1 })

      res.status(200).json({ success: true, events })
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Failed to fetch events' })
    }
  }

  async getEventById(req, res) {
    try {
      const { id } = req.params

      const event = await Event.findById(id)

      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: 'Event not found' })
      }

      res.status(200).json({ success: true, goCount: event.goCount })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching event' })
      console.error('Error fetching event:', error)
    }
  }

  async updateEvent(req, res) {
    try {
      const { id } = req.params
      const { title, description, location, eventType, dateTime } = req.body
      const event = await Event.findById(id)

      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: 'Event not found' })
      }

      if (event.createdBy.toString() !== req.user.id.toString()) {
        return res
          .status(403)
          .json({ success: false, message: 'Unauthorized action' })
      }

      event.title = title || event.title
      event.description = description || event.description

      event.location.country = location?.country || event.location.country
      event.location.city = location?.city || event.location.city
      event.location.address = location?.address || event.location.address
      event.location.postalCode =
        location?.postalCode || event.location.postalCode

      event.eventType = eventType || event.eventType
      event.dateTime = dateTime
        ? new Date(dateTime).toISOString()
        : event.dateTime

      const updatedEvent = await event.save()

      res.status(200).json({ success: true, event: updatedEvent })
    } catch (error) {
      console.error('Error al actualizar evento:', error)
      res.status(400).json({ success: false, message: error.message })
    }
  }

  async incrementGoCount(req, res) {
    try {
      const { id } = req.params

      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $inc: { goCount: 1 } },
        { new: true }
      )

      if (!updatedEvent) {
        return res
          .status(404)
          .json({ success: false, message: 'Event not found' })
      }

      res.status(200).json({ success: true, event: updatedEvent })
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params

      const eventToDelete = await Event.findById(id)

      if (!eventToDelete) {
        return res
          .status(404)
          .json({ success: false, message: 'Event not found' })
      }

      if (eventToDelete.createdBy.toString() !== req.user.id.toString()) {
        return res
          .status(403)
          .json({ success: false, message: 'Unauthorized action' })
      }

      await eventToDelete.deleteOne()
      res
        .status(200)
        .json({ success: true, message: 'Event deleted successfully' })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export default new EventController()
