const express = require('express');
const router = express.Router();
const Results = require('../models/results');


router.get('/', async function (req, res) {
  // const results = await Results.find().populate('user');
  const results = await Results.find();
  // console.log(results);
  res.json(results);
});

router.post('/', async function (req, res) {
  // const results = await Results.find().populate('user');
  const results = await Results.find({_id:req.body.id});
  // console.log(results);
  res.json(results);
  // console.log(req.body)
});

router.delete('/', async function (req,res) {
  const deleteElem = await Results.findOneAndDelete({_id:req.body.id});
  const newResults = await Results.find();
  res.json(newResults);
});


module.exports = router;
