const mongoose = require('mongoose')
const credentials = require('./.credentials.development.json')
const A = require('./models/a.js')

const { connectionString } = credentials.mongo

if (!connectionString) {
  console.log('No connection string found')
  process.exit(1)
}

mongoose.connect(connectionString)

const db = mongoose.connection

db.on('error', err => {
  console.log('MongoDB error: ' + err.message)
  process.exit(1)
})

db.once('open', () => {
  console.log('MongoDB connection open')
})

A.find((err, aList) => {
  if (err) return console.error(err)
  if (aList.length) return

  new A({
    name: 'Hood River Day Trip',
    slug: 'hood-river-day-trip',
    category: 'Day Trip',
    sku: 'HR199',
    description:
      'Spend a day sailing on the Columbia and ' +
      'enjoying craft beers in Hood River!',
    price: 99.95,
    tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
    inSeason: true,
    maximumGuests: 16,
    available: true,
    packagesSold: 0,
  }).save()
  new A({
    name: 'Oregon Coast Getaway',
    slug: 'oregon-coast-getaway',
    category: 'Weekend Getaway',
    sku: 'OC39',
    description: 'Enjoy the ocean air and quaint coastal towns!',
    price: 269.95,
    tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
    inSeason: false,
    maximumGuests: 8,
    available: true,
    packagesSold: 0,
  }).save()
  new A({
    name: 'Rock Climbing in Bend',
    slug: 'rock-climbing-in-bend',
    category: 'Adventure',
    sku: 'B99',
    description: 'Experience the thrill of climbing in the high desert.',
    price: 289.95,
    tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes: 'The tour guide is currently recovering from a skiing accident.',
  }).save()
})

module.exports = {
  getVacations: async (options = {}) => {
    const vacations = [
      {
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',

        sku: 'HR199',
        description:
          'Spend a day sailing on the Columbia and ' +
          'enjoying craft beers in Hood River!',
        location: {
          search: 'Hood River, Oregon, USA',
        },
        price: 99.95,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
      },
    ]
    if (options.available) {
      return (
        vacations.filter(({ available }) => available) === options.available
      )
    }
    return vacations
  },
  addVacationInSeasonListener: async (email, sku) => {
    //
  },
}
