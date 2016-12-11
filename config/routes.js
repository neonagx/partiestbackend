var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override')

var usersController = require('../controllers/users')
var professionalsController = require('../controllers/professionals')
var token = require('./token_auth')

router.route('/api/users')
  .post(usersController.create)
router.route('/api/token')
  .post(token.create)
router.route('/api/me')
  .get(token.authenticate, usersController.me)

router.route('/professionals')
  .get(professionalsController.getAll)
  .post(professionalsController.createProfessional)
router.route('/professionals/:id')
  .get(professionalsController.getProfessional)
  .patch(professionalsController.updateProfessional)
  .delete(professionalsController.deleteProfessional)

module.exports = router
