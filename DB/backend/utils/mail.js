require('dotenv').config()

const nodemailer = require("nodemailer");

const user = "kokathatest61@gmail.com";
const pass = "qWERTY@254";




const sendEmail = async (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: user,
    to: 'francismuti2000@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      throw error;
    } else {
      console.log('Email sent: ' + info.response);
      return info.response;
    }
  });
  
}

exports.sendEmail = sendEmail