const User = require('../models/user.model');
const Necessidades = require('../models/necessidades.model');



module.exports = {
  getPoints,
  getNameCategorias,
  helpUserId,
  getByProduto,
  getProdutosFromCategoria,
  getNecessidades,
  confirmHelp
}

async function confirmHelp(req) {

  return await User.findOneAndUpdate({
    'help._id': req.params.helpId
  }, {
    $push: {
      'help.$.userHelp': {
        userId: req.user._id,
        userEmail: req.user.email.toLowerCase()
      }
    }
  }, {
    upsert: true,
    new: true
  });
}

async function getPoints(req) {

  let points = await User.find({
    
    'help.location': {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [req.params.lng, req.params.lat]
        }
      }
    }
  }).select('_id help');

  for (var i = 0; i < points.length; i++) {
    points[i].help = points[i].help.filter(element => element.isValid);
  }

  return points;

}


async function getNameCategorias(req) {

  return await User.find({
      'help.isValid': true
    })
    .sort({
      createAt: 1
    }).select('help.necessidades');
}

async function helpUserId(userId) {
  return await User.findById(userId);
}

async function getByProduto(produto) {

  return await User.find({}, {
    'help': {
      $elemMatch: {
        'isValid': 'true',
        'necessidades': produto
      }
    }
  });

}

async function getNecessidades(necessidadeId) {

  return await Necessidades.findById(necessidadeId);

}

async function getProdutosFromCategoria(categoria) {

  return await Necessidades.find({
      'categoria': categoria
    })
    .sort({
      produto: 1
   });
}

