var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Dish = require('./src/models/menuModel'), //created model loading here
  bodyParser = require('body-parser');
  

//============================================
// Mongoose Instance connection URL
//============================================
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Menudb'); 

//==================
// Body parser setup 
//==================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=====================
// Route import & setup
//=====================
var routes = require('./src/routes/menuRoutes'); //importing route
routes(app); //register the route

//==========
// EJS (Templating) Setup
//==========


//============
// 404 Routing
//============
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('menu RESTful API server started on: ' + port);
