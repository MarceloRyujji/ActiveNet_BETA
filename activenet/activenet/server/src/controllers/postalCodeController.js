import PostalCode from '../models/postalCodeModel.js'

class PostalCodeController {
  static async getPostalCodesByCity(req, res, next) {
    try {
      const postalCodes = await PostalCode.find({
        city_id: req.params.city_id,
      }).populate('city')
      res.json(postalCodes)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error fetching postal codes' })
    }
  }
}

export default PostalCodeController
