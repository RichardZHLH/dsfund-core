var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	uAddr: {type:String,index:true,unique: true },
    chargeTime:{type:Date}
});


exports.UserSchema = UserSchema;
