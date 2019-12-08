/* 
* Routes : Create routes for all the starwar apis, fetch data from db based on the requirement of each tasks
* Most of the code wrote in ES6 standards
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const express = require('express');
const app = express();
const async = require("async");
const _     = require('underscore');

// Import all models
const filmModel = require('../models/film');
const peopleModel = require('../models/people');
const speciesModel = require('../models/species');
const planetModel = require('../models/planet');
const vehicleModel = require('../models/vehicle');

// To get the longest opening crawl of characters - largest num of characters
app.get('/longestcrawl', async (req, res) => {
  	
  try {
	filmModel.aggregate([
	   {
	      $project: {
	        title: 1,
	        numberOfChars: { $cond: { if: { $isArray: "$characters" }, then: { $size: "$characters" }, else: "0"} }
	      }
	   }, 
	   { $sort : { numberOfChars : -1} }
	]).exec(function (err, listfilms) {
	    
	    let max = 0;
	    let afilm = [];
		async.each(listfilms, function(item, callback) {
			if(!max || max <= item.numberOfChars){
				max = item.numberOfChars;
				afilm.push(item);          
			}

		    callback(null);
		}, function(err) {
			if (err) {
				res.status(500).json(err);
			}

			res.status(200).json({results: afilm});
		});          	
	});

  } catch (err) {
    res.status(500).json(err);
  }
});


// To get the character appeared in most of the films - popular characters
app.get('/popularcharacter', async (req, res) => {

  	const popular_character = await filmModel.find({}).select('characters -_id');

	try {

		let c_arr = popular_character.map(f => f.characters);
		let c_all = c_arr.reduce((a, b) => [...a, ...b], []);
		let occurance = _.countBy(c_all);

		let max = 0;
		let pids = [];
		var sortedbyValueJSONArray = sortByValue(occurance);

		async.each(sortedbyValueJSONArray, function(item, callback) {
			if(!max || max <= item[0]){
				max = item[0];
				pids.push(item[1]);
			}
			
			callback(null);
			
		}, function(err) {
			if (err) {
			   res.status(500).json(err);
			}

			peopleModel.find({id: {$in: pids}}, function (err, apeople) {
				res.status(200).json({results: apeople, total: max});
			});		
		}); 

	} catch (err) {
		res.status(500).send(err);
	}
});


// To get the species appeared in most of the films - popular species
app.get('/popularspecies', async (req, res) => {

	const species_list = await filmModel.find({}).select('species -_id');

	try {
		let s_arr = species_list.map(f => f.species);
		let s_all = s_arr.reduce((a, b) => [...a, ...b], []);
		let s_count = _.countBy(s_all);

		let popular_ids = Object.entries(s_count).sort((a, b) => b[1] - a[1]).slice(0, 3);
		let s_ids = popular_ids.map(k => parseInt(k[0]));

		let popular_species = await speciesModel.find({ id: { '$in': s_ids } }).select('name people -_id');

		var i = 0, _final =[];
		async.each(popular_species, function(spec_row, next) {	

			countOfFilms(spec_row.people).then(function(cnt){ 
				_final.push({ 'name' : spec_row.name, 'count' : cnt});

				i++;
				if(i == popular_species.length){
					_final.sort(function(a,b) {
						return b.count - a.count;
					});
					
					res.status(200).json({result: _final});	
				}
			});
			

	    	next(null);    	
	    });


	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = app

/*********************** async functions ***************************/

// To get the count of films where a character exists
async function countOfFilms(arr_people){
	let todo = 0;
	try{
		for (const [idx, pid] of arr_people.entries()) {
			todo +=  parseInt(await filmModel.countDocuments({ characters: { $in: [pid] } }))
		}
	}catch(e){
		console.log(e)
	}
	return todo;
}

// To sort the array based on value
function sortByValue(jsObj){
    var sortedArray = [];
    for(var i in jsObj)
    {
        // Push each JSON Object entry in array by [value, key]
        sortedArray.push([jsObj[i], i]);
    }
    sortedArray.sort();
    return sortedArray.reverse();
}