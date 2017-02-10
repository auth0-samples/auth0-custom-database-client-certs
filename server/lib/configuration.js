var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  BASE64_SERVER_KEY: process.env.BASE64_SERVER_KEY,
  BASE64_SERVER_CERT: process.env.BASE64_SERVER_CERT,
  BASE64_CA: process.env.BASE64_CA,
  ALLOWED_CLIENT_SUBJECT_NAME : process.env.ALLOWED_CLIENT_SUBJECT_NAME
}
