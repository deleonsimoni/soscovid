const ProducaoAcademica = require('../models/producaoAcademica.model');
const Points = require('../models/points.model');
const PointsCtrl = require('./point.controller');


module.exports = {
  insert,
  update,
  deletar
}

async function insert(req) {

  let response = {
    status: 200,
    temErro: false,
    message: `Abecedário criado com sucesso.`
  };
  req.body.userId = req.user._id;

  let pointFound = await PointsCtrl.getPointsByCoordinator(req.body.lat, req.body.lng);
  if (!pointFound) {
    pointFound = await PointsCtrl.create(req.body);
  }
  req.body.content.userId = req.user._id;
  req.body.content.pointId = pointFound._id;

  let producaoAcademica = await new ProducaoAcademica(req.body.content).save();

  response.point = await Points.findByIdAndUpdate(pointFound._id, {
    $push: {
      producaoAcademica: producaoAcademica._id
    },
    ultimaCategoria: 1
  })

  return response;
}

async function update(req) {
  return await ProducaoAcademica.findByIdAndUpdate(req.body.content._id, req.body.content);
}

async function deletar(req) {
  return await ProducaoAcademica.findOneAndRemove({
    _id: req.params.contentId
  }, function (err, doc) {
    if (err) {
      console.log("erro ao deletar o ProducaoAcademica: " + req.params.contentId, err);
    } else {
      console.log("ProducaoAcademica deletado com sucesso: " + req.params.contentId);
    }
  });
}
