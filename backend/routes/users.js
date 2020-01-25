const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const bcryptjs = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(req.session);
});

router.post('/search', async function(req, res) {
  // console.log(req.body);
  try {
    const result = await User.find({[req.body.type]: req.body.query});
    // console.log(result);
    await res.json({response: result});
  } catch (e) {
    // console.error(e);
    await res.json({response: false});
  }
});

router.get('/search/all', async function(req, res) {
  try {
    const result = await User.find({});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
})

router.post('/signup', async function(req, res, next) { // Регистрация нового пользователя
  try {
    const user = new User({...req.body});
    await user.save();
    req.session.user = user;
    // await res.json({logged_in: true});
    await res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.post('/signin', async function(req, res, next) {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user.password === password && user.active === true) {
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

router.post('/switch_status', async function(req, res) {
  try {
    const id = req.body.id;
    const user = await User.findById(id);
    await User.findOneAndUpdate({_id: id}, {active: !user.active});
    console.log(user.active);
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
});

router.delete('/delete', async function(req, res) {
  try {
    console.log(req.body.id);
    await User.findOneAndDelete({_id: req.body.id});
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
})

module.exports = router;
