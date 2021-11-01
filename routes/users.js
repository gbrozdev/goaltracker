var express = require('express');
var router = express.Router();
var db = require('../connection')
var fun = require('../functions')


/* GET users listing. */

router.get('/', function(req, res) {
  res.render('index');
});




module.exports = router;