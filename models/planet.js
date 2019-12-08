/* 
* Planet Model : Create the schema of planet datastore
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetsSchema = new Schema({
    id : Number,
    climate : String,
    created : String,
    diameter : String,
    edited : String,
    gravity : String,
    name : String,
    orbital_period : String,
    population : String,
    rotation_period : String,
    surface_water : String,
    terrain : String,
});

const Planet = mongoose.model("planets", PlanetsSchema);
module.exports = Planet;