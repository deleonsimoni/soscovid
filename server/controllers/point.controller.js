const User = require('../models/user.model');
const Necessidades = require('../models/necessidades.model');



module.exports = {
  getPoints,
  getNameCategorias,
  helpUserId,
  getByProduto,
  getProdutosFromCategoria
}



async function getPoints(req) {

  return await User.find({
      'help.isValid': true
    })
    .sort({
      createAt: 1
    }).select('_id help');
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

async function getProdutosFromCategoria(categoria) {

  return await Necessidades.find({
      'categoria': categoria
    })
    .sort({
      produto: 1
    });
}
