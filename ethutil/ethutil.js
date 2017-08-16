


var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
const fs = require('fs');
const cfg = require('../config.js');
let ethURI=cfg.ethURI;
var Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(ethURI));

let coinbase = "0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e";
let coinbaseSK = "a4369e77024c2ade4994a9345af5c47598c7cfb36c65e8a4a3117519883d9014";
//let coinbase = "0xe20bfe3c8777036ca0ab03f3bcbbfb438d97dd91";
//let coinbaseSK = "314e96ea4842ed2bc6f16acb8ceb01714dc797433953bf5b63e4dc1a313f5cda";
exports.generateKeyPair = function() {
    var privKey = ethUtil.crypto.randomBytes(32);
    var privKeyHex = ethUtil.bufferToHex(privKey);
    var publKeyHex = ethUtil.bufferToHex(ethUtil.privateToAddress(privKey));
    return {
        'privateKey' : privKeyHex.substr(2),
        'publicKey' : publKeyHex
    }
};

exports.giveDstTo = function(receiveAddress, sdtAmount=20000){
	let abi = fs.readFileSync(__dirname+"/DsfundToken.abi", "utf8");
	let tokenContract = web3.eth.contract(JSON.parse(abi));
	let contractAddr = "0x579ae7a62e4199144551fd542707ea95d7813620";
	let token = tokenContract.at(contractAddr);
    var privateKey = new Buffer(coinbaseSK,'hex');

	var bn = new web3.BigNumber(sdtAmount);
    var hexValue = '0x' + bn.toString(16);
	let contractData = token.transfer.getData(receiveAddress, hexValue);
	console.log("contractData");console.log(contractData);


    var int_serial  = web3.eth.getTransactionCount(coinbase);
    var serial = web3.toHex(int_serial);

    var rawTx = {
        nonce: serial,
        gasLimit: '0x300000',
        pasPrice: '30000000000',
        to: contractAddr,
        value: '0x00',
        data: contractData
    };
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    let serializedTx = tx.serialize();
    web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'),(err, hash)=>{
        if(err){
            console.log("giveSdtTo failed:");
            console.log(err);
        }else{
            console.log("giveSdtTo hash:" + hash);
        }
    });
}
exports.giveEtherTo = function (receiverAddress, etherAmout=0.1)
{
    var int_serial  = web3.eth.getTransactionCount(coinbase);
    var privateKey = new Buffer(coinbaseSK,'hex');
    var amount = web3.toWei(etherAmout, 'ether');
    var bn = new web3.BigNumber(amount);
    var hexValue = '0x' + bn.toString(16);
    var serial = web3.toHex(int_serial);
    var rawTx = {
        nonce: serial,
        gasLimit: '0x100000',
        pasPrice: '30000000000',
        to: receiverAddress,
        value: hexValue
    };
    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'), (err,hash)=>{
        if(err){
            console.log("giveEtherTo failed:");
            console.log(err);
        }else{
            console.log("giveEtherTo hash:" + hash);
        }
    });
}
