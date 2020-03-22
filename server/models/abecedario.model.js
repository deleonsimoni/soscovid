const mongoose = require('mongoose');

const AbecedarioSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pointId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Point'
  },
  nome: {
    type: String,
    required: true
  },
  linkVideo: {
    type: String
  },
  pais: {
    type: String
  },
  entrevistado: {
    type: String
  },
  duracao: {
    type: String
  },
  descricao: {
    type: String
  },
  icAprovado: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  links: [{
    nome: String,
    link: String
  }]

}, {
  versionKey: false
});


module.exports = mongoose.model('Abecedario', AbecedarioSchema);
