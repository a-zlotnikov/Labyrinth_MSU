const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const bcryptjs = require('bcryptjs');
const {newUserCheck} = require('../middleware/auth');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    await res.json(req.session);
  } catch (e) {
    await res.json({success: false});
  }
});

router.post('/search',newUserCheck, async function(req, res) {
  try {
    if (req.body.type === 'year') {
      const result = await User.find({[req.body.type]: Number(req.body.query)});
      await res.json({response: result});
    }
    const result = await User.find({[req.body.type]: {$regex: new RegExp(req.body.query, 'i')}});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
});

router.get('/search/all',newUserCheck, async function(req, res) {
  try {
    const result = await User.find({});
    await res.json({response: result});
  } catch (e) {
    await res.json({response: false});
  }
});

router.post('/signup',newUserCheck, async function(req, res, next) { // Регистрация нового пользователя
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

router.post('/signin',async function(req, res, next) {
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
    await res.json({logged_in: false});
  }
});

router.post('/edit',newUserCheck, async function(req, res, next) {
  try {
    await User.findOneAndUpdate({_id: req.body.id}, req.body);
    const user = await User.findById(req.body.id);
    await res.json({succeeded: true});
  } catch (e) {
    await res.json({succeeded: false});
  }
});

router.post('/switch_status',newUserCheck, async function(req, res) {
  try {
    const id = req.body.id;
    const user = await User.findById(id);
    await User.findOneAndUpdate({_id: id}, {active: !user.active});
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
});

router.delete('/delete',newUserCheck, async function(req, res) {
  try {
    await User.findOneAndDelete({_id: req.body.id});
    await res.json({succeed: true});
  } catch (e) {
    await res.json({succeed: false});
  }
});

router.post('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
