var Professional = require('../models/Professional')
var nodemailer = require('./lib/email.js')

module.exports = {
  getAll: getAll,
  createProfessional: createProfessional,
  getProfessional: getProfessional,
  updateProfessional: updateProfessional,
  deleteProfessional: deleteProfessional,
  sendEmail: sendEmail
}

//GET ALL
function getAll(req, res){
  Professional.find(function(err, professionals){
    if(err) res.json({message: 'Could not find any professional events'})

    res.json(professionals)
  }).select('-__v')
}

//POST
function createProfessional(req, res){
  var professional = new Professional(req.body)
  professional.postedBy = req.decoded._id

  professional.save(function(err, savedProfessional){
    if(err) res.json({message: 'Could not create professional event b/c:' + err})

    res.json(savedProfessional)
  })
}

//SHOW
function getProfessional(req, res){
  var id = req.params.id

  Professional.findById(id, function(err, professional){
    if(err) res.json({message: 'Could not find professional event b/c: ' + err})

    res.json(professional)
  }).select('-__v')
}

//UPDATE
function updateProfessional(req, res){
  var id = req.params.id

  Professional.findById(id, function(err, professional){
    if(err) res.json({message: 'Cannot find professional event b/c: ' + err})

    if(req.body.organizer) professional.organizer = req.body.organizer
    if(req.body.partyTitle) professional.partyTitle = req.body.partyTitle
    if(req.body.company) professional.company = req.body.company
    if(req.body.video) professional.video = req.body.video
    if(req.body.img) professional.img = req.body.img
    if(req.body.location) professional.location = req.body.location
    if(req.body.email) professional.email = req.body.email
    if(req.body.cellPhone) professional.cellPhone = req.body.cellPhone
    if(req.body.officePhone) professional.officePhone = req.body.officePhone
    if(req.body.attendees) professional.attendees = req.body.attendees
    if(req.body.description) professional.description = req.body.description
    if(req.body.publicOrPrivate) professional.publicOrPrivate = req.body.publicOrPrivate
    if(req.body.sponsors) professional.sponsors = req.body.sponsors
    if(req.body.postedBy) professional.postedBy = req.body.postedBy

    professional.save(function(err, updatedProfessional){
      if(err) res.json({message: 'Cannot update b/c: ' + err})

      res.json(updatedProfessional)
    })
  }).select('-__v')
}

//DELETE
function deleteProfessional(req, res){
  var id = req.params.id

  Professional.remove({_id: id}, function(err){
    if(err) res.json({message: 'Cannot delete event b/c ' + err})

    res.json({message: 'Professional Event Deleted'})
  }).select('-__v')
}

//SEND EMAIL
function sendEmail(req, res){
  var id = req.body.id
  console.log("hello")
  Professional.findById(id, function(err, professional){
    if(err) res.json({message: 'cannot find id'})
    nodemailer(req.body.email, professional)
    console.log('hello')
  })

}
