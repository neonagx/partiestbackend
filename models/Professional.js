var mongoose = require('mongoose')

var ProfessionalSchema = mongoose.Schema({
  organizer: String,
  partyTitle: String,
  company: String,
  video: String,
  img: String,
  location: String,
  email: String,
  cellPhone: String,
  officePhone: String,
  attendees: Number,
  description: String,
  publicOrPrivate: String,
  sponsors: String,
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Professional', ProfessionalSchema)
