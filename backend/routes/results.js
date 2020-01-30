const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const {newUserCheck} = require('../middleware/auth');

router.get('/', newUserCheck, async function(req, res) {
  const results = await Results.find();
  res.json(results);
});

router.post('/search', newUserCheck, async function(req, res) {
  try {
    let result = '';
    // req.body.query === result ?
    //   result = await Results.find()
    //   : result = await Results.find({[req.body.type]: req.body.query});
    // result = await Results.find({[req.body.type]: {$regex: new RegExp(req.body.query, 'i')}});
  
    // await res.json({response: result});
    console.log(req.body)
    console.log(result);
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/', newUserCheck, async function(req, res) {
  const results = await Results.find({_id: req.body.id});
  res.json(results);
});

router.delete('/', newUserCheck, async function(req, res) {
  const deleteElem = await Results.findOneAndDelete({_id: req.body.id});
  const newResults = await Results.find();
  res.json(newResults);
});

module.exports = router;
