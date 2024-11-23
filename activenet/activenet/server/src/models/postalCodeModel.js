import mongoose from 'mongoose'

const postalCodeSchema = new mongoose.Schema({
  postalCode: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
})

const PostalCode = mongoose.model('PostalCode', postalCodeSchema)

export default PostalCode
