var express = require('express');
var router = express.Router();
var User = require('../src/models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.getUserByUsername('haisam', function (err, docs) {

  })
  res.send('respond with a resource');
});

module.exports = router;
