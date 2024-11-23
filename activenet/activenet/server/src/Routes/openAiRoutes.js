import express from 'express'
import obtenerRespuesta from '../controllers/openaiController.js'

const router = express.Router()

router.post('/api/openAi', obtenerRespuesta)

export default router
