const nodemailer = require('nodemailer');
const { EMAIL_ID, EMAIL_PASS } = require('./serverConfig');

const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com', // Replace with your provider's SMTP server
    // port: 587, // Port may vary depending on your provider
    // secure: false, // Use true for TLS, false for non-TLS (consult your provider)
    service: 'gmail',
    auth: {
        user: EMAIL_ID, // Replace with your email address
        pass: EMAIL_PASS // Replace with your email password
    }
});

// check whethe we are able to correctly setup our smtp server.
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

/**
 * @param {string} from - sender email
 * @param {string} to - receiver email
 * @param {string} subject - email subject
 * @param {string} text - email body
 */

const sendEmail = async ({ from, to, subject, text }) => {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
    sendEmail,
};