var express = require('express'),
  router = express.Router(),
  menu = require('../controllers/dish'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes');

router.route('/')
  .get(function (req, res, next) {
    return menu.list_all_dishes(req, res);
  })
  .post(function (req, res, next) {
    return menu.create_a_dish(req, res)
  })

router.route('/:dishId')
  .get(function (req, res, next) {
    return menu.read_a_dish(req, res)
  })
  .put(function (req, res, next) {
    return menu.update_a_dish(req, res)
  })
  .delete(function (req, res, next) {
    return menu.delete_a_dish(req, res);
  })

module.exports = router;