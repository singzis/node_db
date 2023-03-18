const mongoose = require('mongoose')

const aSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  location: {
    search: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: Number,
  tags: [String],
  inSeason: Boolean,
  maximumGuests: Number,
  available: Boolean,
  packagesSold: Number,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
})

const A = mongoose.model('A', aSchema)
module.exports = A