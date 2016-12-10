var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override')

var usersController = require('../controllers/users')
var token = require('./token_auth')

router.route('/api/users')
  .post(usersController.create)
router.route('/api/token')
  .post(token.create)
router.route('/api/me')
  .get(token.authenticate, usersController.me)

module.exports = router
