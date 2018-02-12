var express = require('express')
  mongoose = require('mongoose')
  Dish = require('./src/models/dish')
  bodyParser = require('body-parser')
  path = require('path')
  AWS = require('aws-sdk'),
    // env = require('./env.json')

global.__base        = __dirname + '/';
global.__models      = __base + 'src/models/';
global.__routes      = __base + 'src/routes/';
global.__mode        = process.env.MODE;
console.log('running in mode: '+__mode)

//============================================
// Mongoose Instance connection URL
//============================================
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Menudb');
if(__mode === 'dev'){
  mongoose.connect('mongodb://localhost:27017/Menudb')
}else{
  mongoose.connect('mongodb://heroku_q2x32n54:bacghnbpvs47faq3p8u1j9eh2v@ds161584.mlab.com:61584/heroku_q2x32n54');
}

//=============
// AWS S3 setup
//=============

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || env.aws.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || env.aws.AWS_SECRET_ACCESS_KEY,
})
global.__s3Bucket = new AWS.S3({
  params: {
    Bucket: process.env.S3_BUCKET_NAME || env.aws.S3_BUCKET_NAME
  }
})
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
