var ethUtil = require('ethereumjs-util');
var ethKeys = require("ethereumjs-keys");


ethUtil.crypto = require('crypto');



exports.generateKeyPair = function() {
    var privKey = ethUtil.crypto.randomBytes(32);
    var privKeyHex = ethUtil.bufferToHex(privKey);
    var publKeyHex = ethUtil.bufferToHex(ethUtil.privateToAddress(privKey));
    return {
        'privateKey' : privKeyHex.substr(2),
        'publicKey' : publKeyHex
    }
};

exports.generateKeyJson = function(){
	let password = "wanglu"

	// Key derivation function (default: PBKDF2) 
	var kdf = "scrypt"; // slow
	//var kdf = "pbkdf2"; // fast
	 
	// Generate private key and the salt and initialization vector to encrypt it 
	var dk = ethKeys.create();
	// Export key data to keystore "secret-storage" format: 
	// https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition 
	var json = ethKeys.dump(password, dk.privateKey, dk.salt, dk.iv, kdf);
	console.log(json);
	return json;
}

exports.generateKeyJson();
