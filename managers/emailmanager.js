const nodemailer = require("nodemailer");

const emailManager = async (email, subject, text) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a5942260258ac1",
      pass: "eb2c2f06db65c1",
    },
  });

  await transport.sendMail({
    to: email,
    from: "info@expensetracker",
    text: text,
    subject: subject,
  });
};

module.exports = emailManager;
