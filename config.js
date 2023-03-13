const env = process.env.NODE_ENV || 'development'
const credentials = require(`./.credential.${env}.json`)
module.exports = { credentials }
