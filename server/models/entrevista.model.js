const mongoose = require('mongoose');

const EntrevistaSchema = new mongoose.Schema({

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
  verbete: {
    type: String
  },
  descricao: {
    type: String
  },
  linkVideo: {
    type: String
  },
  entrevistado: {
    type: String
  },
  original: {
    type: String
  },
  duracao: {
    type: String
  },
  formato: {
    type: String
  },
  pais: {
    type: String
  },
  icAprovado: {
    type: Boolean,
    default: true
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


module.exports = mongoose.model('Entrevista', EntrevistaSchema);
