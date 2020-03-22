const mongoose = require('mongoose');

const NecessidadesSchema = new mongoose.Schema({
  necessidades: {
    categoria: Number,
    produto: String,
    icon: String
  }

}, {
  versionKey: false
});


module.exports = mongoose.model('Necessidades', NecessidadesSchema);
