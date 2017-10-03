'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishSchema = new Schema({
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
<<<<<<< HEAD
  tags: {
    type: [String],
    required: 'Please tag the dish'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
=======
  tags: [{type: String}]
},{
  timestamps: true
>>>>>>> origin
});

module.exports = mongoose.model('Dishes', DishSchema);