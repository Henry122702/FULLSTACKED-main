const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

//* Load User model
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
     new LocalStrategy({ usernameField: 'username' }, (name, password, done) => {
      //* Find user with the same name
      User.findOne({
        name: name }).then(user => {
            if (!user) {
                return done(null, false, { message: 'That name is not registered' });
        }

        //* Find the hashed password that matches with the user
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
};