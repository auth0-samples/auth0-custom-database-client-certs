var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  BASE64_CLIENT_KEY: process.env.BASE64_CLIENT_KEY,
  BASE64_CLIENT_CERT: process.env.BASE64_CLIENT_CERT,
  BASE64_CA: process.env.BASE64_CA,
  API_ENDPOINT: process.env.API_ENDPOINT
}
