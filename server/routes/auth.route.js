const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const pointsCtrl = require('../controllers/point.controller');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);

router.post('/login', passport.authenticate('local', {
  session: false
}), login);

router.get('/me', passport.authenticate('jwt', {
  session: false
}), login);

router.get('/refresh', passport.authenticate('jwt', {
  session: false
}), refresh);

router.get('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(getPointsByCategoriaAdmin));

router.get('/chkVsk/:version', asyncHandler(chkVsk));


async function chkVsk(req, res) {
  if (req.params.version == "0.0.5b") {
    res.json({
      atualizado: 1
    });
  } else {
    res.json({
      atualizado: 0
    });
  }

}

async function refresh(req, res) {
  res.json({
    user: req.user
  });
}

async function getPointsByCategoriaAdmin(req, res) {
  let user = await pointsCtrl.getPointsByCategoriaAdmin(req);
  res.json(user);
}

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({
    user,
    token
  });
}
