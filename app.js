const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
  })
)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/newsletter-signup', handlers.newsletterSignup)

app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(3000, () => {
  console.log('express started')
})

// var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use('/p', express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'files')))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
