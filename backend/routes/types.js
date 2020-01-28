const express = require('express');
const router = express.Router();
const Type = require('../models/type');

router.get('/', async function(req, res) {
  try {
    await res.json(req.session);
  } catch (e) {
    await res.json({success: false});
  }
});

module.exports = router;