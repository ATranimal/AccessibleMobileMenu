'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the dish'
  },
  description: {
    type: String,
    required: 'Please enter the description of the dish'
  },
  price: {
    type: Number,
    required: 'Please enter the price of the dish'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Dishes', DishSchema);