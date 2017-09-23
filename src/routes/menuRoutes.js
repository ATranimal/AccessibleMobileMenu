'use strict';
module.exports = function(app) {
  var menu = require('../controllers/menuController'),
    mongoose = require('mongoose'),
    Dish = mongoose.model('Dishes');

  //=======================
  // Renders the index page
  //=======================
  // *NOTE: REALLY does not scale atm, really just for testing. If we need to render with multiple 
  //        model lists in the future, need better logic, need to separate that into a JS file in the
  //        future to avoid clogging up the routing page.
  //=======================
  app.get('/', function (req, res) {
    Dish.find({}, function(err, foodList) {
      // TODO: Proper error hadnling
      if (err) console.log("ERROR: Query cannot be found");
      res.render('pages/index', {
        dishes: foodList
      });
    });
  });

  //=================
  // dish REST Routes
  //=================
  app.route('/dishes')
    .get(menu.list_all_dishes)
    .post(menu.create_a_dish);

  //====================
  // dish id REST routes
  //====================
  app.route('/dishes/:dishId')
    .get(menu.read_a_dish)
    .put(menu.update_a_dish)
    .delete(menu.delete_a_dish);
};