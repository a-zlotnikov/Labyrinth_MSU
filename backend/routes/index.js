const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('ru');
const {Field} = require('../models/field');
const {Environment} = require('../models/environment');
const {Experiment} = require('../models/experiment');
const {newUserCheck} = require('../middleware/auth');


/* GET home page. */
router.get('/getField',newUserCheck, async (req, res) => {
  const field = await Field.find({}, {'__v': 0});
  res.json(field[0].line);
});

router.post('/saveField',newUserCheck, async (req, res) => {

  const envirCheck = await Environment.find({name: req.body.name});
  if(envirCheck[0]){
    res.json({answer: 'busy'})
  } else {
  const newEnv = await new Environment({
    name: req.body.name,
    field: {line: req.body.field},
  });
  await newEnv.save();
  res.json(newEnv);
  }
});


router.post('/startExp', async (req, res) => {
  if (req.body.archive) {
    newExp = await new Experiment({
      env: {name: req.body.name},
    });
    await newExp.save();
    res.json({id: newExp._id});
  }
});

router.post('/saveExp',newUserCheck, async (req, res) => {
  const date = moment().format('L');
  const time = moment().format('LTS');
  const user = {
    _id: req.session.user._id,
  };
  await Experiment.updateOne({_id: req.body.id}, {
    date,
    time,
    user,
    env: {name: req.body.envName},
    expName: req.body.expName,
    animalName: req.body.expAnimal,
    expNumber: Number(req.body.expNumber),
    expType: req.body.expType,
    moves: req.body.moves,
  });
});

router.post('/getExpField',newUserCheck, async (req, res) => {
  const exp = await Experiment.find({_id: req.body.id});
  const env = exp[0].env.name;
  const environ = await Environment.find({name: env});
  res.json(environ[0]);
});

router.post('/getNewExpField',newUserCheck, async (req, res) => {
  let newExpEnv = await new Experiment({
    env: {name: req.body.env},
  });
  await newExpEnv.save();
  res.json({id: newExpEnv._id});
});

module.exports = router;
