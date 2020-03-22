const mongoose = require('mongoose');

const AudioSchema = new mongoose.Schema({

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
  descricao: {
    type: String
  },
  linkAudio: {
    type: String
  },
  entrevistado: {
    type: String
  },
  pais: {
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


module.exports = mongoose.model('Audio', AudioSchema);
