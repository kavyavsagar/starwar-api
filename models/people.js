/* 
* People Model : Create the schema of people/characters/pilots datastore
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    id : Number,
    birth_year : String,
    created : String,
    edited : String,
    eye_color : String,
    gender : String,
    hair_color : String,
    height : String,
    homeworld : Number,
    mass : String,
    name : String,
    skin_color : String
}, { collection: 'people' });


const People = mongoose.model("people", PeopleSchema);
module.exports = People;