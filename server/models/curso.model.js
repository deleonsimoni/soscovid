const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({

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
    type: String
  },
  estado: {
    type: String
  },
  universidade: {
    type: String
  },
  faculdade: {
    type: String
  },
  pagina: {
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


module.exports = mongoose.model('Curso', cursoSchema);
