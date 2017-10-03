'use strict';

var mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes');


//=========
// Dish API
//=========
exports.list_all_dishes = function(req, res) {
  Dish.find({}, function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

exports.create_a_dish = function(req, res) {
  var new_dish = new Dish(req.body);
  new_dish.save(function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

//============
// Dish ID API
//============

exports.read_a_dish = function(req, res) {
  Dish.findById(req.params.dishId, function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

exports.update_a_dish = function(req, res) {
  Dish.findOneAndUpdate({_id: req.params.dishId}, req.body, {new: true}, function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

exports.delete_a_dish = function(req, res) {
  Dish.remove({
    _id: req.params.dishId
  }, function(err, dish) {
    if (err)
      res.send(err);
    res.json({ message: 'Dish successfully deleted' });
  });
};