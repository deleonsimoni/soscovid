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

  console.log(req.params.helpId)
  console.log(req.user._id)
  console.log(req.user.email)
  return await User.findOneAndUpdate({
    'help._id': req.params.helpId
  }, {
    $push: {
      'userHelp': {
        "userId": req.user._id,
        "userEmail": req.user.email.toLowerCase()
      }
    }
  }, {
    new: true
  }, function (err, doc) {
    if (err) {
      console.log("Erro ao incluir o id do usuario no help: ", err);
    } else {
      console.log("Sucesso ao vincular usuario ao help: ", err);
    }
  });
}

async function getPoints(req) {

  console.log(req.params.lng, req.params.lat)
  return await User.find({
    'help.location': {
      $near: {
        $maxDistance: 100,
        $geometry: {
          type: "Point",
          coordinates: [req.params.lng, req.params.lat]
        }
      }
    }
  }).select('_id help');;

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
