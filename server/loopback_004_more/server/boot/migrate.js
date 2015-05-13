console.log('hello from migrate.js');

module.exports = function(app, cb) {

  // http://docs.strongloop.com/display/public/LB/Connect+your+API+to+a+data+source
  // http://docs.strongloop.com/display/public/LB/Creating+a+database+schema+from+models

  app.dataSources.pg.isActual(function(err, actual) {
    console.log(actual);
  });

  //app.dataSources.pg.createModel('messages');

  app.dataSources.pg.automigrate(function(err) {
    if (err) return cb(err);

    console.log('Models automigrated.');

    app.dataSources.pg.autoupdate(function(err) {
     if (err) return cb(err);

     console.log('Models autoupdated.');

      var Myuser = app.models.myuser;
      var Role = app.models.Role;
      var RoleMapping = app.models.RoleMapping;

      Myuser.create([
        {username: 'admin', email: 'admin@foo.com', password: '123456'}
      ], function(err, users) {
        if (err) return cb(err);
        console.log('Created users:', users);

        //create the admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) return cb(err);
          console.log('Created admin role:', role);

          // make admin an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) return cb(err);

            console.log('Created admin principal:', principal);
            return cb();
          });
        });
      });
    });
  });
};
