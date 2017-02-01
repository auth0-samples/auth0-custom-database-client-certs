var login = require('./login');

login('john@example.com', 'p@ssw0rd', function(err, data){
  if(err){
    console.error(`An error has occured ${err}`);
    return;
  }

  console.log(`Got data from the secure endpoint; '${data.message}'`);
  if(data.user) console.log(data.user);
});
