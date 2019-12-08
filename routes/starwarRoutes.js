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


module.exports = app
