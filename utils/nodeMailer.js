var nodemailer = require("nodemailer");
class nodeMailer {
  mailer = (email, token) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "niharikarao.nr19@gmail.com",
        pass: "Password@123",
      },
    });

    var mailOptions = {
      from: "niharikarao.nr19@gmail.com",
      to: email,
      subject: "Sending Sample Email using Node.js",
      html: `<a>${token}</a>`,
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