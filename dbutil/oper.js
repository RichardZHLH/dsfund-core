const DBTS = require("./tables.js");
const cfg = require("../config.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let options = {
	useMongoClient:true,
	poolSize: 5
};
mongoose.connect(cfg.mongooseURI, options);
var db = mongoose.connection;

var UserModel = db.model("user", DBTS.UserSchema);



function insertUser(user)
{
	console.log(user);
	UserModel.create(user, function(err,r){
				if(err){
					console.log("insertUser:" +err);
				}
			});
}
function handleuser(where, callback){
	UserModel.find(where,  function(err, res){
		if(err){
			console.log(err);
		}else{
			callback(res);
		}
	});
}
exports.insertUser = insertUser;

