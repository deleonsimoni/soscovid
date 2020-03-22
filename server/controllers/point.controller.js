const User = require('../models/user.model');



module.exports = {
  getPoints,
  getNameCategorias,
  helpUserId,
  getByProduto,
  getProdutosFromCategoria
}



async function getPoints(req) {

  return await User.find({})
    .sort({
      createAt: 1
    }).select('_id help');
}


async function getNameCategorias(req) {

  return await User.find({})
    .sort({
      createAt: 1
    }).select('help.necessidades');
}

async function helpUserId(userId) {
  return await User.findById(userId);
}

async function getByProduto(produto) {

  return await User.find({
      'help.necessidades.produto': produto
    })
    .sort({
      createAt: 1
    }).select('_id help');
}

async function getProdutosFromCategoria(categoria) {

  return await User.find({
      'help.necessidades.categoria': categoria
    })
    .sort({
      createAt: 1
    }).select('_id help');
}
