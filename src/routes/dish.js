var express = require('express'),
  router = express.Router(),
  menu = require('../controllers/dish'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dishes'),
  multer = require('multer'),
  fs = require('fs'),
  upload = multer({dest: 'uploads/'});

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

router.route('/:dishId/picture')
  .get(function (req, res, next) {
    const dishId = req.params.dishId,
      imgKey = 'dishes/' + dishId + '/picture'
    Dish.findById(dishId)
      .then(dish => {
        if(!dish){
          return Promise.reject('Dish not found')
        }
        var imageObject = {Key: imgKey}
        var getImage = new Promise((resolve, reject) => {
          __s3Bucket.getObject(imageObject, function (err, data) {
            if(err) return reject(err)
            return resolve(data)
          })
        })
        return Promise.resolve(getImage)
      })
      .then(data => {
        res.setHeader('content-type', 'image/jpeg')
        return res.send(data.Body)
      })
      .catch(err => next(err))
  })
  .put(upload.single('picture'), function (req, res, next) {
    const dishId = req.params.dishId,
    imgKey = 'dishes/' + dishId + '/picture',
      fileType = req.file.mimetype
    Dish.findById(dishId)
      .then(dish => {
        if(!dish){
          return Promise.reject('Dish not found')
        }
        let readFile = new Promise((resolve, reject) => {
          fs.readFile(req.file.path, function (err, result) {
            if (err) return reject(err)
            else return resolve(result)
          })
        })
        return readFile
      })
      .then(image => {
        var imageObject = {
          Key: imgKey,
          Body: image,
          ContentType: fileType,
          ACL: 'public-read'
        }
        let storeImage = new Promise((resolve, reject) => {
          __s3Bucket.putObject(imageObject, function (err, result) {
            if (err) return reject(err)
            else return resolve(result)
          })
        })
        return Promise.resolve(storeImage)
      })
      .then(() => res.send('ok'))
      .catch(err => next(err))
  })
  .delete(function (req, res, next) {
    const dishId = req.params.dishId,
      imgKey = 'dishes/' + dishId + '/picture'
    Dish.findById(dishId)
      .then(dish => {
        if(!dish) {
          return Promise.reject('Dish not found')
        }
        var imageObject = {Key: imgKey}
        var deleteImage = new Promise((resolve, reject) => {
          __s3Bucket.deleteObject(imageObject, function (err, result) {
            if(err) return reject(err)
            return resolve(result)
          })
        })
      })
      .then(data => {
        console.log(data)
        res.send('ok')
      })
      .catch(err => next(err))
  })

module.exports = router;