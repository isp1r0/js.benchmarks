'use strict';

module.exports = function(app, session) {
  var min = 1;
  var max = 10;
  var rnd1 = Math.floor(Math.random() * (max - min) + min - Math.random());
  app.use(session({
    sessionId: rnd1,
    cookie: {
      httpOnly: true,
      secure: true
    }
  }));

  app.post('/', function(req, res) {
    res.send(Math.random());
  });
};