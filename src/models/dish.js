'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishSchema = new Schema({
  restaurant: {
    type: String,
    required: 'Please enter the name of the restaurant',
  },
  name: {
    type: String,
    required: 'Please enter the name of the dish',
    unique: true
  },
  description: {
    type: String,
    required: 'Please enter the description of the dish'
  },
  price: {
    type: Number,
    required: 'Please enter the price of the dish'
  },
  category: {
    type: String,
    required: "Please enter a menu category"
  },
  ingredients: [{type: String}]
},{
  timestamps: true
});

module.exports = mongoose.model('Dishes', DishSchema);