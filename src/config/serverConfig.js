const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  // this path define where our evn file is located
  path: path.resolve(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASS: process.env.EMAIL_PASS,
};