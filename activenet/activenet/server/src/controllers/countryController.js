import Country from '../models/countryModel.js'

class CountryController {
  static async getAllCountries(req, res, next) {
    try {
      const countries = await Country.find()
      res.json(countries)
    } catch (err) {
      res.status(500).json({ message: 'Error fetching countries' })
    }
  }
}

export default CountryController
