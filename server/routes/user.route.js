const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const fileUpload = require('express-fileupload');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.post('/upload', [fileUpload()], asyncHandler(upload));
router.get('/downloadFile', downloadFile);

router.post('/callHelp', passport.authenticate('jwt', {
  session: false
}), asyncHandler(callHelp));

router.route('/')
  .post(asyncHandler(insert));

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function callHelp(req, res) {
  let user = await userCtrl.callHelp(req.user, req.body);
  res.json(user);
}

async function upload(req, res) {
  let response = await userCtrl.upload(req);
  res.json(response);
}

async function downloadFile(req, res) {
  let response = await userCtrl.downloadFileS3(req.query.fileName);
  res.json(response);
}
