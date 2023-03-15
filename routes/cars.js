var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const carSchema = {
  name:{
    type:String,
    default:"Honda"
  },
  model: String,
  make: String,
  year: Number
}; 

const Cars = mongoose.model("Cars", carSchema);


/* GET home page. */

router.post('/addCars', async function(req, res) {
   let car =new Cars({ year: req.body.year, model: req.body.model, make: req.body.make})
   
   car.save();
  res.send("Created").status(200)
  
});

router.get('/', async function(req, res) {
  let cars = await Cars.find({})
  // res.send(cars).status(200)
  res.render("index",{filter:"year",cars:cars})
});
router.get('/year', async function(req, res) {
  console.log(req.body)
  let cars = await Cars.find({ year: req.query.year })
  res.render("index",{filter:"make",cars:cars})

  // res.send(cars).status(200)
});

router.get('/make', async function(req, res) {
  let cars = await Cars.find({ make: req.query.make })
  res.render("index",{filter:"model",cars:cars})
  // res.send(cars).status(200)
  
});

router.get('/model', async function(req, res) {
  let cars = await Cars.find({ model: req.query.model })
  res.render("index",{cars:cars})
  // res.send(cars).status(200)
  
});

module.exports = router;
