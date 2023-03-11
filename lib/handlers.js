const fortune = require('./fortune')

exports.home = (req, res) => {
  res.render('home')
}

exports.about = (req, res) => {
  res.render('about', { fortune: fortune.getFortunes() })
}

exports.notFound = (req, res) => {
  res.status(404)
  res.render('404')
}

exports.serverError = (err, req, res, next) => {
  res.status(500)
  res.render('500')
}

exports.newsletterSignup = (req, res) => {
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
  console.log(`CSRF token (from hidden from field): ${req.body._csrf}`)
  console.log(`Name (from visible form field): ${req.body.name}`)
  console.log(`Email (from visible form field): ${req.body.email}`)
  res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you')
}