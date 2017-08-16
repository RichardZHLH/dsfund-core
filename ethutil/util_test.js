#!/usr/bin/env node


const eth=require('./util.js');

let keyPair = eth.generateKeyPair();
let userAddr = keyPair.publicKey;
//eth.giveDstTo(userAddr);
eth.giveEtherTo(userAddr);