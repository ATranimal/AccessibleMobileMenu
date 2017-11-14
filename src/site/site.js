var express = require('express'),
  router = express.Router(),
  menu = require('../controllers/dish'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes'),
  _ = require('underscore');

router.route('/')
  .get(function (req, res, next) {
    return res.render('pages/index', {
    });
  })


router.route('/aw/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      var categories = _.pluck(foodList, 'category');
      categories = _.uniq(categories)
      return res.render('pages/menu1', {
        dishes: foodList,
        categories: categories
      });
    });
  })

  router.route('/tran/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      var categories = _.pluck(foodList, 'category');
      categories = _.uniq(categories)
      return res.render('pages/menu2', {
        dishes: foodList,
        categories: categories
      });
    });
  })


  router.route('/3/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      return res.render('pages/index3', {
        dishes: foodList
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