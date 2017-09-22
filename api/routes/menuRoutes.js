'use strict';
module.exports = function(app) {
  var menu = require('../controllers/menuController');

  // todoList Routes
  app.route('/dishes')
    .get(menu.list_all_dishes)
    .post(menu.create_a_dish);


  // app.route('/dishes/:dishId')
  //   .get(menu.read_a_dish)
  //   .put(menu.update_a_dish)
  //   .delete(menu.delete_a_dish);
};
