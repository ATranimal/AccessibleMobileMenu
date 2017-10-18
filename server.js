var express = require('express'),
  mongoose = require('mongoose'),
  Dish = require('./src/models/dish')
  bodyParser = require('body-parser');
  path = require('path');

global.__base        = __dirname + '/';
global.__models      = __base + 'src/models/';
global.__routes      = __base + 'src/routes/';

//============================================
// Mongoose Instance connection URL
//============================================
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Menudb');
// mongoose.connect('mongodb://heroku_q2x32n54:bacghnbpvs47faq3p8u1j9eh2v@ds161584.mlab.com:61584/heroku_q2x32n54'); 

//==================
// Body parser setup 
//==================
app = express();
port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=====================
// Route import & setup
//=====================
app.use('/api/v1', require(__routes));
app.use('/', require(__base + 'src/site/'))

//=======================
// EJS (Templating) Setup
//=======================
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//============
// 404 Routing
//============
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('menu RESTful API server started on: ' + port);
