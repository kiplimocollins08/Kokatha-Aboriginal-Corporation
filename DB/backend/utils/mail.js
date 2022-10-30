require('dotenv').config()

const nodemailer = require("nodemailer");

const user = "kokathatest61@outlook.com";
const pass = "qWERTY@254";


const sendEmail = async (to, subject, text) => {

  try {
  var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: user,
    to: to,
    subject: subject,
    text: text
  };
  
  console.log(mailOptions);

  let info = await transporter.sendMail(mailOptions).catch((err) => {
    console.log("Error: ");
    console.log(err);
  });

  return info;

  } catch(err) {
    return "Failed";
  }
  
}

exports.sendEmail = sendEmail