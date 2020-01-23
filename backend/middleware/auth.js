function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

const checkSession = (req, res) => {
  if (req.session.user) {
    res.send({ result: true });
    // console.log({ result: true })
  } else {
    res.send({ result: false });
    // console.log ({ result: false })
  }
};

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

const newUserCheck = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = {
  sessionChecker,
  cookiesCleaner,
  newUserCheck,
  checkSession,
};
