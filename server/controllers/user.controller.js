const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Necessidades = require('../models/necessidades.model');

const config = require('../config/config');


module.exports = {
  insert,
  callHelp,
}

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}


async function callHelp(user, data) {

  let necessidadesId = [];
  let necessidadeAux = '';

  for (var i = 0; i < data.necessidades.length; i++) {
    necessidadeAux = await Necessidades.find({
      produto: data.necessidades[i].produto.toLowerCase()
    }).select('_id');

    if (necessidadeAux.length) {
      necessidadesId.push(necessidadeAux[0]);
    } else {
      necessidadeAux = await new Necessidades(data.necessidades[i]).save();
      necessidadesId.push(necessidadeAux);
    }
  }

  data.necessidades = necessidadesId;
  return await User.findByIdAndUpdate(user._id, {
    $set: {
      help: data
    }
  }, {
    new: true
  })

}
