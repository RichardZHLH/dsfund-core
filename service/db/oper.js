const DBTS = require("./tables.js");
const cfg = require("../../cfg.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let options = {
  server: {
    auto_reconnect: true,
    poolSize: 5
  }
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
exports.insertUser = insertUser;

