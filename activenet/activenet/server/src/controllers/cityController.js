import City from '../models/cityModel.js'

class CityController {
  static async getCitiesByCountry(req, res, next) {
    try {
      const cities = await City.find({
        country_id: req.params.country_id,
      }).populate('country')
      res.json(cities)
    } catch (err) {
      res.status(500).json({ message: 'Error fetching cities' })
    }
  }

  static async getAllCities(req, res, next) {
    try {
      const cities = await City.find()
      res.json(cities)
    } catch (err) {
      res.status(500).json({ message: 'Error fetching cities' })
    }
  }
}

export default CityController
