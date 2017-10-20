var express = require('express'),
  router = express.Router(),
  menu = require('../controllers/dish'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes'),
  _ = require('underscore');

router.route('/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      let categories = _.pluck(foodList, 'category');
      return res.render('pages/index', {
        dishes: foodList,
        categories: categories
      });
    });
  })

router.route('/inputform/')
  .get(function (req, res, next) {
    return res.render('pages/inputform');
  });

router.route('/preferences')
  .get(function (req, res, next) {
    return res.render('pages/preferences');
  })

  
module.exports = router;