var express = require('express');
var router = express.Router();

var products = require('../api/data/products');
var links = require('../api/data/links');
console.log(products);

/* GET home page. */
router.get('/', function(req, res, next) {
  var pageParams = {
    title: 'Express',
  };
  pageParams['shoes'] = products.shoes;
  pageParams['headbands'] = products.headbands;
  pageParams['links'] = links;
  //-
  res.render('index', pageParams);
});


router.get('/shoes', function(req, res, next) {
  pageParams['shoes'] = products.shoes;
  res.render('index', pageParams);
});

router.get('/headbands', function(req, res, next) {
  pageParams['headbands'] = products.headbands; 
  res.render('index', pageParams);
});



module.exports = router;
