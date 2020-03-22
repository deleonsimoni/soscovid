const mongoose = require('mongoose');

const ProducaoAcademicaSchema = new mongoose.Schema({

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

  titulo: {
    type: String
  },
  descricao: {
    type: String
  },
  autoria: {
    type: String
  },
  original: {
    type: String
  },
  linkVideo: {
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


module.exports = mongoose.model('ProducaoAcademica', ProducaoAcademicaSchema);
