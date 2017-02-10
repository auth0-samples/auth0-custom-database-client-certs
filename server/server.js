var express = require('express');
var fs = require('fs');
var https = require('https');
var clientCertificateAuth = require('client-certificate-auth');
var configuration = require('./lib/configuration');
var bodyParser = require('body-parser');

// The keys are stored in the configuration as Base64 to avoid issues with format and encoding
var base64Key = new Buffer(configuration.BASE64_SERVER_KEY, 'base64');
var base64Cert = new Buffer(configuration.BASE64_SERVER_CERT, 'base64');
var base64CA = new Buffer(configuration.BASE64_CA, 'base64');

var opts = {
    // Server SSL private key and certificate
    key: base64Key.toString(),
    cert: base64Cert.toString(),
    // issuer/CA certificate against which the client certificate will be
    // validated. A certificate that is not signed by a provided CA will be
    // rejected at the protocol layer.
    ca: base64CA.toString(),
    // request a certificate, but don't necessarily reject connections from
    // clients providing an untrusted or no certificate. This lets us protect only
    // certain routes, or send a helpful error message to unauthenticated clients.
    requestCert: true,
    rejectUnauthorized: false
};

var app = express();

app.use(bodyParser.json());


// Middleware that sets the req.user to the certificate subject. This should be adapted to include the real user
var setCertificateSubjectAsUser = function(req, res, next) {
    var clientCertificate = req.connection.getPeerCertificate();
    req.user = clientCertificate.subject;
    next();
}

var checkAuth = function(cert, callback) {

    /*
  * allow access if certificate subject Common Name is 'Doug Prishpreed'.
  * this is one of many ways you can authorize only certain authenticated
  * certificate-holders; you might instead choose to check the certificate
  * fingerprint, or apply some sort of role-based security based on e.g. the OU
  * field of the certificate. You can also link into another layer of
  * auth or session middleware here; for instance, you might pass the subject CN
  * as a username to log the user in to your underlying authentication/session
  * management layer.
  */
  callback(cert.subject.CN === configuration.ALLOWED_CLIENT_SUBJECT_NAME);
};

app.get('/', function(req, res) {
    res.json({message: 'Hi I\'m a unsecured endpoint'});
});

app.post('/login', clientCertificateAuth(checkAuth), setCertificateSubjectAsUser, function(req, res) {
    if(req.body && req.body.email === 'john@example.com' && req.body.password === 'p@ssw0rd'){
      console.log('Received valid credentials');
      res.json({message: 'Hi I\'m a secured endpoint', user: req.user});
    }else{
      console.log('Received invalid credentials');
      res.sendStatus(401);
    }
});

https.createServer(opts, app).listen(process.env.PORT || 8080);
