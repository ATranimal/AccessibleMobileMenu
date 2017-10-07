var express = require('express'),
  router = express.Router(),
  menu = require('../controllers/dish'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes');

router.route('/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      return res.render('pages/index', {
        dishes: foodList
      });
    });
  })

router.route('/inputform/')
  .get(function (req, res, next) {
    return res.render('pages/inputform');
  });

  
module.exports = router;