var request = require('request');
var configuration = require('./lib/configuration')

module.exports = function(email, password, callback) {

    // The keys are stored in the configuration as Base64 to avoid issues with format and encoding
    var base64Key = new Buffer(configuration.base64ClientKey, 'base64');
    var base64Cert = new Buffer(configuration.base64ClientCert, 'base64');
    var base64CA = new Buffer(configuration.base64CA, 'base64');

    var options = {
        url: 'https://api.mycompany.com:8080/login',
        key: base64Key.toString(),
        cert: base64Cert.toString(),
        ca: base64CA.toString(),
        json: {
            email: email,
            password: password
        },
        method: "POST"
    }

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        } else {
          callback(error || new Error(`Received status code ${response.statusCode}`));
        }
    });
}
