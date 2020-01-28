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

router.post('/create', async function(req, res) {
  try {
    await res.json(req.session);
  } catch (e) {
    await res.json({success: false});
  }
});

router.put('/edit', async function(req, res) {
  try {
    await res.json(req.session);
  } catch (e) {
    await res.json({success: false});
  }
});

router.delete('/delete', async function(req, res) {
  try {
    await res.json(req.session);
  } catch (e) {
    await res.json({success: false});
  }
});

module.exports = router;