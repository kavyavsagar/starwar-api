/* 
* Species Model : Create the schema of species datastore
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    id : Number,
    average_height : String,
    average_lifespan : String,
    classification : String,
    created : String,
    designation : String,
    edited : String,
    eye_colors : String,
    hair_colors : String,
    homeworld : Number,
    language : String,
	name : String,
	people : Array,
	skin_colors : String,
}, { collection: 'species' });

const Species = mongoose.model("species", SpeciesSchema);
module.exports = Species;