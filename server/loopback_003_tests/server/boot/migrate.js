console.log('hello from migrate.js');

module.exports = function(app, cb) {

  // http://docs.strongloop.com/display/public/LB/Connect+your+API+to+a+data+source
  // http://docs.strongloop.com/display/public/LB/Creating+a+database+schema+from+models
  app.dataSources.pg.autoupdate(function(err) {
    if (err) return cb(err);

    console.log('Models autoupdated.');
    return cb();
  });
};
