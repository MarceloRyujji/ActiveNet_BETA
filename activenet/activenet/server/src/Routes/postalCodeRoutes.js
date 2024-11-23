import express from 'express'
import PostalCodeController from '../controllers/postalCodeController.js'

const router = express.Router()

router.get('/postal-code/:city_id', PostalCodeController.getPostalCodesByCity)

export default router
