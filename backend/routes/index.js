
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

  let newEnv;
  let newExp;
  const envName = req.body.name;
  const envCheck = await Environment.find({name: envName});
  if (req.body.archive){
    newExp = await new Experiment({
      env: {name: req.body.name}
    });
    await newExp.save();
    res.json({id: newExp._id})
  } else if(envCheck[0]){
    res.json({answer: 'envName is busy'})
  } else {
    newEnv = await new Environment({
      name: req.body.name,
      field: {line: req.body.field},
    });
    await newEnv.save();
    const newEnvId = await Environment.find({name: req.body.name});

    newExp = await new Experiment({
      env: {name: newEnvId[0].name}
    });
    await newExp.save();
    res.json({id: newExp._id})
  }

});

router.post('/saveExp', async (req, res) => {
  const user = {
    _id: req.session.user._id
  };
  await Experiment.updateOne({_id: req.body.id}, {user: user, expName: req.body.expName, moves: req.body.moves, env: {name: req.body.envName}});

});

router.post('/getExpField', async (req, res) => {
  const exp = await Experiment.find({_id: req.body.id});
  const env = exp[0].env.name;
  const environ = await Environment.find({name: env});
  res.json(environ[0])
});

router.post('/getNewExpField', async (req, res) => {
  console.log(req.body.name);

});

module.exports = router;
