var nodemailer = require("nodemailer");
require('dotenv').config();

/**
 * @description sends mail to user
 * @returns error or data
 */

class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "niharikarao.nr19@gmail.com",
        pass: "Niharika1999",
      },
    });

    var mailOptions = {
      from: "niharikarao.nr19@gmail.com",
      to: email,
      subject: "Sending Sample Email using Node.js",
      html: `<a href='http://localhost:3000/reset/${token}'>click here</a>`,
      text: "Password reset",
    };

    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully.";
      })
      .catch((err) => {
        return err;
      });
  };
}

module.exports = new nodeMailer();