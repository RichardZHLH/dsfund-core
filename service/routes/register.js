var express = require('express');
var router = express.Router();
let dbop = require('../../dbutil');
let eth = require('../../ethutil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', {title:"register"});
}).post('/', function(req,res){
	var userAddr = req.body.userAddr;
	if(!userAddr){
		console.log("no user addr, create one");
		let keyPair = eth.generateKeyPair();
		console.log("new pubkey is "+keyPair.publicKey);
		userAddr = keyPair.publicKey;
	}

	let user = {"uAddr":userAddr};
	dbop.insertUser(user);
	res.render('register_info',{"uAddr":userAddr});
});

module.exports = router;
