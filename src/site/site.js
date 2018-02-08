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


router.route('/dating/')
  .get(function (req, res, next) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      var sample = _.sample(foodList);
      return res.render('pages/dating', {
        dish: sample,
      });
    });
  })

// router.route('/:dishId')
//   .get(function (req, res, next) {
//     return menu.read_a_dish(req, res)
//   })

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


router.route('/inputform/')
.get(function (req, res, next) {
  return res.render('pages/inputformsplash');
});

router.route('/inputform/aw')
.get(function (req, res, next) {
  Dish.find({}, function(err, foodList) {
    // TODO: Proper error hadnling
    if (err) console.log("ERROR: Query cannot be found");
    var categories = _.pluck(foodList, 'category');
    categories = _.uniq(categories)
    return res.render('pages/inputform1', {
      dishes: foodList,
      categories: categories
    });
  });
});

router.route('/inputform/tran')
.get(function (req, res, next) {
  Dish.find({}, function(err, foodList) {
    // TODO: Proper error hadnling
    if (err) console.log("ERROR: Query cannot be found");
    var categories = _.pluck(foodList, 'category');
    categories = _.uniq(categories)
    return res.render('pages/inputform2', {
      dishes: foodList,
      categories: categories
    });
  });
});



router.route('/preferences')
.get(function (req, res, next) {
  return res.render('pages/preferences');
})

  
module.exports = router;