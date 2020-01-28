const express = require('express');
const router = express.Router();
const {Environment} = require('../models/environment');

/* GET home page. */
router.get('/', async (req, res) => {
  const results = await Environment.find();
  res.json(results);
});

router.delete('/', async (req,res) => {
  const elemDel = await Environment.findByIdAndDelete(req.body.id);
  const results = await Environment.find();
  res.json(results);
})
//
// router.post('/saveField', async (req, res) => {
//
//   const newEnv = await new Environment({
//     name: req.body.name,
//     field: {line: req.body.field},
//   });
//   await newEnv.save();
//   res.json(newEnv);
// });
//
// router.post('/startExp', async (req, res) => {
//   let newEnv;
//   let newExp;
//   const envName = req.body.name;
//   const envCheck = await Environment.find({name: envName});
//   // console.log(envCheck[0]);
//   if(envCheck[0]){
//     res.json({answer: 'envName is busy'})
//   } else {
//     newEnv = await new Environment({
//       name: req.body.name,
//       field: {line: req.body.field},
//     });
//     await newEnv.save();
//
//     newExp = await new Experiment({
//       env: newEnv
//     });
//     await newExp.save();
//     res.json({id: newExp._id})
//   }
//
// });
//
// router.post('/getExpField', async (req, res) => {
//   const exp = await Experiment.find({_id: req.body.id});
//   // console.log(exp);
//   res.json(exp[0])
// });

module.exports = router;
