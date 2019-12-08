/* 
* Connect to DB with Mongoose and set connection variable
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');

let dburi  = process.env.MONGODB_URI || 'mongodb://candidate:PrototypeRocks123654@ds345028.mlab.com:45028/star-wars';
let opt = {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
		};

var db = mongoose.connect(dburi, opt, function(error){
    if(error) {
    	throw error;
    	process.exit(0);
    }

    console.log("DB connection successful");
});
mongoose.Promise = global.Promise;