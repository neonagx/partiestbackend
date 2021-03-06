var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cors = require('cors')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()

//use .env file to hide sensitive info
require('dotenv').config()

var mongoose = require('mongoose')

var db = process.env.MONGODB_URI || 'mongodb://localhost/partiest'
mongoose.connect(db)

// Initial VIEW ENGINE NOT WORKING
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// routes to all the api
var routes = require('./config/routes')

//Use of cors
app.use(cors())

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//validate content
app.use(validateContentType)

app.use(routes)

app.use(addFailedAuthHeader)

var port = process.env.PORT || 3000
app.listen(port)

function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST'];
  if (                                    // If the request is
    methods.indexOf(req.method) !== -1 && // one of PUT, PATCH or POST, and
    Object.keys(req.body).length !== 0 && // has a body that is not empty, and
    !req.is('json')                       // does not have an application/json
  ) {                                     // Content-Type header, then …
    var message = 'Content-Type header must be application/json.';
    res.status(400).json(message);
  } else {
    next();
  }
}


// When there is a 401 Unauthorized, the repsonse shall include a header
// WWW-Authenticate that tells the client how they must authenticate
// their requests.
function addFailedAuthHeader(err, req, res, next) {
  var header = {'WWW-Authenticate': 'Bearer'};
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`;
    res.set(header);
  }
  next(err);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
