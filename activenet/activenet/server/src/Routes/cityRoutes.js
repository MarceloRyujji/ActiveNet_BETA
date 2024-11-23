import express from 'express'
import cityController from '../controllers/cityController.js'

const router = express.Router()

router.get('/cities/:country_id', cityController.getCitiesByCountry)
router.get('/cities', cityController.getAllCities)

export default router
