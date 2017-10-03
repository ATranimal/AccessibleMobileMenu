// routes/index.js
var express = require('express'),
  router = express.Router();

router.use('/dish', require('./site'));
module.exports = router;
