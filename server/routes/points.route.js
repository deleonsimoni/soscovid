const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const abecedarioCtrl = require('../controllers/abecedario.controller');
const audioCtrl = require('../controllers/audio.controller');
const entrevistaCtrl = require('../controllers/entrevista.controller');
const producaoAcademicaCtrl = require('../controllers/producaoAcademica.controller');
const politicaCtrl = require('../controllers/politica.controller');
const escolaCtrl = require('../controllers/escola.controller');
const cursoCtrl = require('../controllers/curso.controller');
const cineclubCtrl = require('../controllers/cineclub.controller');

const pointsCtrl = require('../controllers/point.controller');


const router = express.Router();
module.exports = router;

/*router.use(passport.authenticate('jwt', {
  session: false
}))*/

router.get('/:categoriaId', asyncHandler(getPointsByCategoria));
router.get('/:categoriaId/:pointId', asyncHandler(getContentOfPoint));

router.post('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(incluirContentByCategoria));

router.delete('/:categoriaId/:contentId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(deleteContentByCategoria));

router.put('/:categoriaId', passport.authenticate('jwt', {
  session: false
}), asyncHandler(updateContentByCategoria));

router.get('/abecedario/:pointId', asyncHandler(getAbecedarioPoint));
router.get('/audio/:pointId', asyncHandler(getAudioPoint));
router.get('/entrevista/:pointId', asyncHandler(getEntrevistaPoint));
router.get('/producaoAcademica/:pointId', asyncHandler(getProducaoAcademicaPoint));
router.get('/politica/:pointId', asyncHandler(getPoliticaPoint));
router.get('/escola/:pointId', asyncHandler(getEscolaPoint));
router.get('/curso/:pointId', asyncHandler(getCursoPoint));
router.get('/cineclub/:pointId', asyncHandler(getCineclubPoint));

//****** METODOS  *******/



async function getContentOfPoint(req, res) {
  let user = await pointsCtrl.getContentOfPoint(req);
  res.json(user);
}

async function getAbecedarioPoint(req, res) {
  let user = await pointsCtrl.getAbecedarioPoint(req);
  res.json(user);
}

async function getAudioPoint(req, res) {
  let user = await pointsCtrl.getAudioPoint(req);
  res.json(user);
}

async function getEntrevistaPoint(req, res) {
  let user = await pointsCtrl.getEntrevistaPoint(req);
  res.json(user);
}

async function getProducaoAcademicaPoint(req, res) {
  let user = await pointsCtrl.getProducaoAcademicaPoint(req);
  res.json(user);
}

async function getPoliticaPoint(req, res) {
  let user = await politicaCtrl.getPoliticaPoint(req);
  res.json(user);
}

async function getEscolaPoint(req, res) {
  let user = await escolaCtrl.getEscolaPoint(req);
  res.json(user);
}

async function getCursoPoint(req, res) {
  let user = await cursoCtrl.getCursoPoint(req);
  res.json(user);
}

async function getCineclubPoint(req, res) {
  let user = await cineclubCtrl.getCineclubPoint(req);
  res.json(user);
}

async function getPointsByCategoria(req, res) {
  let user = await pointsCtrl.getPointsByCategoria(req);
  res.json(user);
}

async function incluirContentByCategoria(req, res) {
  let content;

  if (req.user.icAdmin) {
    req.body.content.icAprovado = true;
  }
  switch (Number(req.params.categoriaId)) {
    case 1:
      content = await abecedarioCtrl.insert(req);
      res.json(content);
      break;
    case 2:
      content = await entrevistaCtrl.insert(req);
      res.json(content);
      break;

    case 3:
      content = await audioCtrl.insert(req);
      res.json(content);
      break;

    case 4:
      content = await producaoAcademicaCtrl.insert(req);
      res.json(content);
      break;

    case 5:
      content = await politicaCtrl.insert(req);
      res.json(content);
      break;

    case 6:
      content = await escolaCtrl.insert(req);
      res.json(content);
      break;

    case 7:
      content = await cursoCtrl.insert(req);
      res.json(content);
      break;

    case 8:
      content = await cineclubCtrl.insert(req);
      res.json(content);
      break;

    default:
      break;
  }
}

async function deleteContentByCategoria(req, res) {
  let user;
  switch (Number(req.params.categoriaId)) {
    case 1:
      user = await abecedarioCtrl.deletar(req);
      res.json(user);
      break;
    case 2:
      user = await entrevistaCtrl.deletar(req);
      res.json(user);
      break;
    case 3:
      user = await audioCtrl.deletar(req);
      res.json(user);
      break;
    case 4:
      user = await producaoAcademicaCtrl.deletar(req);
      res.json(user);
      break;

    case 5:
      user = await politicaCtrl.deletar(req);
      res.json(user);
      break;

    case 6:
      user = await escolaCtrl.deletar(req);
      res.json(user);
      break;

    case 7:
      user = await cursoCtrl.deletar(req);
      res.json(user);
      break;

    case 8:
      user = await cineclubCtrl.deletar(req);
      res.json(user);
      break;
    default:
      break;
  }
}

async function updateContentByCategoria(req, res) {
  let user;
  switch (Number(req.params.categoriaId)) {
    case 1:
      user = await abecedarioCtrl.update(req);
      res.json(user);
      break;
    case 2:
      user = await entrevistaCtrl.update(req);
      res.json(user);
      break;
    case 3:
      user = await audioCtrl.update(req);
      res.json(user);
      break;
    case 4:
      user = await producaoAcademicaCtrl.update(req);
      res.json(user);
      break;
    case 5:
      user = await politicaCtrl.update(req);
      res.json(user);
      break;
    case 6:
      user = await escolaCtrl.update(req);
      res.json(user);
      break;
    case 7:
      user = await cursoCtrl.update(req);
      res.json(user);
      break;
    case 8:
      user = await cineclubCtrl.update(req);
      res.json(user);
      break;
    default:
      break;
  }
}
