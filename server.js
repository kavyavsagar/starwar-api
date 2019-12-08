/* 
* Main file which created api server, set all configurations including mongodb, app, routing and error handing etc.
* Created at : 06-12-2019
* Author : Kavya Sagar
*/

const express = require('express');

const bodyParser = require('body-parser');
const cors = require("cors");

require("./config/db");

const app = express();

app.use(bodyParser.json());

app.use(cors());


/***********  Cross-Origin Resource Sharing    **************/
app.use((req, res, next) => {
    req.header('Access-Controll-Allow-Orgin','*');
    req.header(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


/********* Defining Routes **********/
// Send message for default URL
app.get('/', (req, res) => res.status(500).json({message: 'Not allowed to access'}));
app.get('/api', (req, res) => res.status(500).json({message: 'Not allowed to access'}));

// Use Api routes in the App
// Routes which should handle requests
const filmRouter = require('./routes/starwarRoutes.js');
app.use('/api', filmRouter);


/******  Handling Errors ******/
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
});
/**************************/



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});