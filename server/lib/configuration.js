var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  base64ServerKey: process.env.BASE64_SERVER_KEY,
  base64ServerCert: process.env.BASE64_SERVER_CERT,
  base64CA: process.env.BASE64_CA,
  allowedClientSN : process.env.ALLOWED_CLIENT_SUBJECT_NAME
}
