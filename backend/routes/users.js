const express = require('express');
const router = express.Router();
// const db = require('../middleware/db-connect');
const User = require('../models/user');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const bcryptjs = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) { // Регистрация нового пользователя
  console.log('>>> SIGNUP');
  console.log(req.body);
  try {
    /*const {
      username,
      password,
      category,
      surname,
      name,
      gender,
      dob,
      hand,
      group,
      year,
    } = req.body;*/
    const user = new User({...req.body});
    await user.save();
    req.session.user = user;
    await res.json({logged_in: true});
  } catch (e) {
    await res.json({logged_in: false});
  }
});

router.post('/users/signin', async function(req, res, next) {
  try {
    const {username, password} = req.body;
    const user = User.find({username});
    if (user.password === password) {
      req.session.user = user;
      await res.json({logged_in: true});
    } else {
      await res.json({logged_in: false});
    }
  } catch (e) {
    await res.json({logged_in: false});
  }
});

module.exports = router;
