var redisClient = require('redis-connection')(); // instantiate redis-connection
// bring your own validation function
module.exports = function validate (decoded, request, callback) {
  // console.log(" - - - - - - - DECODED token:");
  // console.log(decoded);
  // do your checks to see if the session is valid
  redisClient.get(decoded.id, function (rediserror, redisreply) {
    var profile;
    if(!rediserror && redisreply) {
      profile = JSON.parse(redisreply);
      // console.log(' - - - - - - - REDIS reply - - - - - - - ');
      // console.log( JSON.stringify(profile, null, 2) );
      return callback(rediserror, true, profile);
    }
    else { // unable to find session in redis ... redisreply is null
      console.log('hapi-auth-jwt2 validate Redis Error: ', rediserror);
      return callback(rediserror, false); // second param false reflects failed auth
    }
  });
};
