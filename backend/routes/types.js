const express = require('express');
const router = express.Router();
const Type = require('../models/type');

router.get('/', async function(req, res) {
  try {
    const result = await Type.find({});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/create', async function(req, res) {
  try {
    const type = new Type({...req.body});
    await type.save();
    await res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.put('/edit', async function(req, res) {
  console.log(req.body);
  try {
    await Type.findOneAndUpdate({_id: req.body.id}, req.body);
    await res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.delete('/delete', async function(req, res) {
  try {
    await Type.findOneAndDelete({_id: req.body.id});
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
});

module.exports = router;
