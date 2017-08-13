var express = require('express');
var router = express.Router();
let ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', {title:"register"});
}).post('/', function(req,res){
	var userAddr = req.body.userAddr;
	if(!userAddr){
		console.log("no user addr, create one");
	}
});

module.exports = router;
