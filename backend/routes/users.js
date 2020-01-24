const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const bcryptjs = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(req.session);
});

router.post('/search', async function(req, res) {
  console.log(req.body);
  try {
    const result = await User.find({[req.body.type]: req.body.query});
    console.log(result);
    await res.json({response: result});
  } catch (e) {
    console.error(e);
    await res.json({response: false});
  }
});

router.post('/signup', async function(req, res, next) { // Регистрация нового пользователя
  try {
    const user = new User({...req.body});
    console.log('>>> USER');
    console.log(user);
    await user.save();
    console.log('>>> Save ok');
    req.session.user = user;
    // await res.json({logged_in: true});
    await res.json({succeeded: true});
  } catch (e) {
    console.error(e);
    await res.json({succeeded: false});
  }
});

router.post('/signin', async function(req, res, next) {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user.password === password) {
      req.session.user = user;
      // await res.json({logged_in: true});
      await res.json(req.session);
    } else {
      await res.json({logged_in: false});
    }
  } catch (e) {
    console.error(e);
    await res.json({logged_in: false});
  }
});

module.exports = router;
