var express = require('express');
var router = express.Router();
let eth = require('../eth/util.js');

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
	//eth.giveEtherTo(userAddr);
	eth.giveDstTo(userAddr);
});

module.exports = router;
