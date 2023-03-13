const fortune = require('./fortune')

exports.home = (req, res) => {
  req.session.userName = 'John'
  res.render('home')
}

exports.about = (req, res) => {
  console.log(req.session.userName);
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
