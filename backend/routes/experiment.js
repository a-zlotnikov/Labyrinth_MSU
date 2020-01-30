const express = require('express');
const router = express.Router();
const {Experiment} = require('../models/experiment');
const {newUserCheck} = require('../middleware/auth');

router.get('/', newUserCheck, async (req, res) => {
  const results = await Experiment.find().populate('user');
  res.json(results);
});

router.post('/search', newUserCheck, async function(req, res) {
  try {
    let result = '';
    result = req.body.query === result ?
      await Experiment.find().populate('user') :
        await Experiment.find({
          [req.body.type]: req.body.query,
        }).populate('user');
    await res.json({response: result});
  } catch (e) {
    console.log(e);
    await res.json({response: false});
  }
});

router.post('/', newUserCheck, async function(req, res) {
  const results = await Experiment.find({_id: req.body.id}).populate('user');
  res.json(results);
});

router.delete('/', newUserCheck, async function(req, res) {
  const deleteElem = await Experiment.findOneAndDelete({_id: req.body.id});
  const newResults = await Experiment.find().populate('user');
  res.json(newResults);
});

module.exports = router;
