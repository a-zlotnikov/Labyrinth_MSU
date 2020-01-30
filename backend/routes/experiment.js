const express = require('express');
const router = express.Router();
const {Experiment} = require('../models/experiment');

router.get('/', async (req, res) => {
  const results = await Experiment.find().populate('user');
  res.json(results);
});

router.post('/search', async function(req, res) {
  try {
    let result = '';
    req.body.query === result ?
      result = await Experiment.find() :
      result = await Experiment.find({[req.body.type]: req.body.query});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/', async function(req, res) {
  const results = await Experiment.find({_id: req.body.id}).populate('user');
  res.json(results);
});

router.delete('/', async function(req, res) {
  const deleteElem = await Experiment.findOneAndDelete({_id: req.body.id});
  const newResults = await Experiment.find().populate('user');
  res.json(newResults);
});

module.exports = router;
