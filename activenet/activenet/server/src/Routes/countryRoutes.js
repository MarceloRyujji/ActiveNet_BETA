import express from 'express'
import CountryController from '../controllers/countryController.js'

const router = express.Router()

router.get('/countries', CountryController.getAllCountries)

export default router
