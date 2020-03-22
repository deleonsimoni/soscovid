const mongoose = require('mongoose');

const CineclubSchema = new mongoose.Schema({

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
  pais: {
    type: String
  },
  cidade: {
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


module.exports = mongoose.model('Cineclub', CineclubSchema);
