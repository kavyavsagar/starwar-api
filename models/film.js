/* 
* Film Model : Create the schema of film datastore
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    id : Number,
    characters : Array,
    created : String,
    director : String,
    edited : String,
    episode_id : Number,
    opening_crawl : String,
    planets : Array,
    producer : String,
    release_date : String,
    species : Array,
    starships : Array,
    title : String,
    vehicles : Array
});

const Film = mongoose.model("films", FilmSchema);
module.exports = Film;