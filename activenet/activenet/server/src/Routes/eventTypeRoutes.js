import express from 'express'
import EventTypeController from '../controllers/eventTypeController.js'

const router = express.Router()

router.get('/event-types', EventTypeController.getAllEventTypes)

export default router
