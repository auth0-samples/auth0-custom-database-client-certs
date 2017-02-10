// Only necessary if running locally, so remove the next line when running in an Auth0 Database Action script.
var configuration = require('./lib/configuration');

module.exports = function(email, password, callback) {
    var request = require('request');

    // The keys are stored in the configuration as Base64 to avoid issues with format and encoding
    var base64Key = new Buffer(configuration.BASE64_CLIENT_KEY, 'base64');
    var base64Cert = new Buffer(configuration.BASE64_CLIENT_CERT, 'base64');
    var base64CA = new Buffer(configuration.BASE64_CA, 'base64');

    var options = {
        url: configuration.API_ENDPOINT,
        key: base64Key.toString(),
        cert: base64Cert.toString(),
        ca: base64CA.toString(),
        json: {
            email: email,
            password: password
        },
        method: "POST"
    };

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        } else {
          callback(error || new Error("Received status code " + response.statusCode));
        }
    });
}
