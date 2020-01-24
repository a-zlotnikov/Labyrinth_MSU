const express = require('express');
const router = express.Router();
const Results = require('../models/results');

router.get('/', async function (req, res) {
  // const results = await Results.find().populate('user');
  const results = await Results.find();
  // console.log(results);
  res.json(results);
});

module.exports = router;
