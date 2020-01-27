const express = require('express');
const router = express.Router();
const Results = require('../models/results');

router.get('/', async function(req, res) {
  const results = await Results.find();
  res.json(results);
});

router.post('/search', async function(req, res) {
  try {
    console.log(req.body);
    let result = '';
    req.body.query === result ?
      result = await Results.find() :
      result = await Results.find({[req.body.type]: req.body.query});
    await res.json({response: result});
    console.log(result);
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/', async function(req, res) {
  const results = await Results.find({_id: req.body.id});
  res.json(results);
});

router.delete('/', async function(req, res) {
  const deleteElem = await Results.findOneAndDelete({_id: req.body.id});
  const newResults = await Results.find();
  res.json(newResults);
});

module.exports = router;
