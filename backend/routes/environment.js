const express = require('express');
const router = express.Router();
const {Environment} = require('../models/environment');
const {newUserCheck} = require('../middleware/auth');

/* GET home page. */
router.get('/',newUserCheck, async (req, res) => {
  const results = await Environment.find();
  res.json(results);
});

router.delete('/',newUserCheck, async (req,res) => {
  const elemDel = await Environment.findByIdAndDelete(req.body.id);
  const results = await Environment.find();
  res.json(results);
})


module.exports = router;
