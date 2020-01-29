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


module.exports = router;
