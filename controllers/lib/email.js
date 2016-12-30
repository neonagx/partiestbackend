var nodemailer = require('nodemailer')

var config = {
  user: process.env.THEPARTIEST_GMAIL,
  pass: process.env.THEPARTIEST_GMAIL_PW
}

var transporter = nodemailer.createTransport(`smtps://${config.user}%40gmail.com:${config.pass}@smtp.gmail.com`)

module.exports = (email, data) => {

  var mailOptions = {
    from: `"thePartiest" <${config.user}@gmail.com>`,
    to: email,
    subject: "This is your party invite",
    text: `Please insert text`,
    html: `<b>You have been invited to ${data.partyTitle}!</b><div>Party Organizer: ${data.organizer}</div><div></div>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) return console.log(error)
    console.log('Message sent: ' + info.response)
  })
}
