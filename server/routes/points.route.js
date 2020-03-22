const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const pointsCtrl = require('../controllers/point.controller');

const router = express.Router();
module.exports = router;

/*router.use(passport.authenticate('jwt', {
  session: false
}))*/

router.get('/', asyncHandler(getPoints));
router.get('/categoriasName', asyncHandler(getNameCategorias));
router.get('/helpUserId/:userId', asyncHandler(helpUserId));
router.get('/getByProduto/:produto', asyncHandler(getByProduto));
router.get('/getProdutosFromCategoria/:idCategoria', asyncHandler(getProdutosFromCategoria));



//****** METODOS  *******/

async function getPoints(req, res) {
  let user = await pointsCtrl.getPoints(req);
  res.json(user);
}

async function getNameCategorias(req, res) {
  let user = await pointsCtrl.getNameCategorias(req);
  res.json(user);
}

async function getByProduto(req, res) {
  let user = await pointsCtrl.getByProduto(req.params.produto);
  res.json(user);
}

async function getProdutosFromCategoria(req, res) {
  let user = await pointsCtrl.getProdutosFromCategoria(req.params.idCategoria);
  res.json(user);
}


async function helpUserId(req, res) {
  let user = await pointsCtrl.helpUserId(req.params.userId);
  res.json(user);
}
