const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//* Load User model
const User = require('../models/User');


//* Register Page
router.get('/register', (req, res) => { res.render('register', { title: 'Register' });
});

//* Login Page
router.get('/login', (req, res) => { res.render('login', { title: 'Login' });
});

//* Register Handle
router.post('/register', ( req, res) => {
    const { name, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register',  {
        errors,
        name,
        password,
        password2,
        title: 'Register'
      });
    } else {
      User.findOne({ name: name }).then(user => {
        if (user) {
          errors.push({ msg: 'Name already exists' });
          res.render('register',  {
            errors,
            name,
            password,
            password2,
            title: 'Register'
          });
        } else {
          const newUser = new User({
            name,
            password
          });
//* Password Encryption (Hashing)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
});

//* Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//* Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/blogs');
});

module.exports = router;