const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  // this path define where our evn file is located
  path: path.resolve(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
};