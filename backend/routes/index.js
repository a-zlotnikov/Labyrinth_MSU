
const express = require('express');
const router = express.Router();
const {Field} = require('../models/field');
const {Environment} = require('../models/environment');
const {Experiment} = require('../models/experiment');

/* GET home page. */
router.get('/getField', async (req, res) => {
  const field = await Field.find({}, {'__v': 0});
  res.json(field[0].line);
});

router.post('/saveField', async (req, res) => {
  const newEnv = await new Environment({
    name: req.body.name,
    field: {line: req.body.field},
  });
  await newEnv.save();
  res.json(newEnv);
});

router.post('/startExp', async (req, res) => {
  console.log(req.body)
  
  let newEnv;
  let newExp;
  const envName = req.body.name;
  const envCheck = await Environment.find({name: envName});
  // console.log(envCheck[0]);
  if(envCheck[0]){
    res.json({answer: 'envName is busy'})
  } else {
    newEnv = await new Environment({
      name: req.body.name,
      field: {line: req.body.field},
    });
    await newEnv.save();

    newExp = await new Experiment({
      env: newEnv
    });
    await newExp.save();
    res.json({id: newExp._id})
  }

});

router.post('/getExpField', async (req, res) => {
  const exp = await Experiment.find({_id: req.body.id});
  // console.log(exp);
  res.json(exp[0])
});

module.exports = router;
