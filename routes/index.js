var express = require('express');
var router = express.Router();

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
  res.render('login', { login: true });
});



module.exports = router;
