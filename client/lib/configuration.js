var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  base64ClientKey: process.env.BASE64_CLIENT_KEY,
  base64ClientCert: process.env.BASE64_CLIENT_CERT,
  base64CA: process.env.BASE64_CA
}
