const express = require('express');
const router = express.Router();
const Type = require('../models/type');
const {newUserCheck} = require('../middleware/auth');

router.get('/', newUserCheck, async function(req, res) {
  try {
    const result = await Type.find({});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/create',newUserCheck, async function(req, res) {
  try {
    const type = new Type({...req.body});
    await type.save();
    await res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.put('/edit',newUserCheck, async function(req, res) {
  console.log(req.body);
  try {
    const type = await Type.findOne({_id: req.body.id});
    type.name = req.body.name;
    await type.save();
    //await Type.findOneAndUpdate({_id: req.body.id}, req.body);
    res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.delete('/delete',newUserCheck, async function(req, res) {
  try {
    await Type.findOneAndDelete({_id: req.body.id});
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
});

module.exports = router;
