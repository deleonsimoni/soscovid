const mongoose = require('mongoose');

const NecessidadesSchema = new mongoose.Schema({
  categoria: Number,
  produto: {
    type: String,
    lowercase: true
  },
  icon: String
}, {
  versionKey: false
});


module.exports = mongoose.model('Necessidades', NecessidadesSchema);
