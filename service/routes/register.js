var express = require('express');
var router = express.Router();
let dbop = require('../../dbutil');
let eth = require('../../ethutil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', {title:"register"});
}).post('/', function(req,res){
	var userAddr = req.body.userAddr;
	let userSK = "";
	if(!userAddr){
		console.log("no user addr, create one");
		let keyPair = eth.generateKeyPair();
		console.log("new pubkey is "+keyPair.publicKey);
		userAddr = keyPair.publicKey;
		userSK = keyPair.privateKey;
	}

	let user = {"uAddr":userAddr};
	if(userSK){
		user.uSK = userSK;
	}
	dbop.insertUser(user, function(err, r){
		if(err){
			console.log("register failed:" +err);
			res.render('register_info',{"err":err});
		}else{
			console.log("register successfully");
			res.render('register_info',{"user":user});
		}
	});
});

module.exports = router;
