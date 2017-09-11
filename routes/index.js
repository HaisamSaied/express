var express = require('express');
var router = express.Router();
var User = require('../src/models/user');
var products = require('../api/data/products');
var links = require('../api/data/links');
console.log(products);

var pageParams = {
  title: 'Express',
};
pageParams['shoes'] = products.shoes;
pageParams['headbands'] = products.headbands;
pageParams['links'] = links;

/* GET home page. */
router.get('/', function(req, res, next) {
  pageParams['path'] = req.path;
  res.render('index', pageParams);
});


router.get('/shoes', function(req, res, next) {
  pageParams['path'] = req.path;
  res.render('index', pageParams);
});

router.get('/headbands', function(req, res, next) {
  pageParams['path'] = req.path;
  res.render('index', pageParams);
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    login: true,
    register: false
  });
});

//register
router.get('/register', function(req, res, next) {
  return res.render('login', {
    login: false,
    register: true
  });
});

router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

    if (email &&
      username &&
      password &&
      confirmPassword) {

      //confirm that user typed same password twice
      if (password !== confirmPassword) {
        var err = new Error('Passwords do not match.');
      }
      //create object with form input
      var userData = {
        email: email,
        name: username,
        password: password
      }

      //user schema's create method to insert document into mongo
      User.create(userData, function(error, user) {
        if (error) {
          var err = new Error('All fields are required.');
          err.status = 400;
          return next(error);
        } else {
          console.log(user);
          return res.redirect('/login');
        }

      });
    };
  }
);

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.identifyUser(username, password, function(err, user) {
    console.log(user);
    res.json(user);
  })
});

module.exports = router;
