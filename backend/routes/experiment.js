const express = require('express');
const router = express.Router();
const {Experiment} = require('../models/experiment');
const {newUserCheck} = require('../middleware/auth');

router.get('/', newUserCheck, async (req, res) => {
  const count = await Experiment.find().populate('user').count();
  const results = await Experiment.find().populate('user').limit(20).skip(0);
  res.json({results, count});
});

router.post('/pogination', newUserCheck, async (req, res) => {
  const skip = Number(req.body.skip);
  console.log(req.body.skip);
  const results = await Experiment.find().populate('user').limit(20).skip(skip);
  res.json(results);
});


router.post('/allSearch', newUserCheck, async function(req, res) {
    let result = '';
    result = req.body.query === result ?
      await Experiment.find().populate('user') :
        await Experiment.find({
          [req.body.type]: req.body.query,
        }).populate('user');
    await res.json({response: result});
});

router.post('/studentSearch', newUserCheck, async function(req, res) {
  let result = '';
  result = (req.body.query === result) ||(req.body.query === undefined) ?
    await Experiment.find({user:req.body.id}).populate('user') :
    await Experiment.find({user:req.body.id,
      [req.body.type]: req.body.query,
    }).populate('user');
  await res.json({response: result});
});

router.post('/details', newUserCheck, async function(req, res) {
  const results = await Experiment.find({_id: req.body.id}).populate('user');
  res.json(results);
});


router.post('/', newUserCheck, async function(req, res) {
  const results = await Experiment.find({user: req.body.id}).populate('user');
  res.json(results);
});

router.delete('/', newUserCheck, async function(req, res) {
  const deleteElem = await Experiment.findOneAndDelete({_id: req.body.id});
  const newResults = await Experiment.find().populate('user');
  res.json(newResults);
});

module.exports = router;
