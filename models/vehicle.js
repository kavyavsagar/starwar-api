/* 
* Vehicle Model : Create the schema of vehicle datastore
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehiclesSchema = new Schema({
    id : Number,
    pilots : Array,
    vehicle_class : String,
});

const Vehicle = mongoose.model("vehicles", VehiclesSchema);
module.exports = Vehicle;