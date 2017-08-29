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
