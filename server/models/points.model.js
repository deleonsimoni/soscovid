const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nome: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    ultimaCategoria: {
        type: Number
    },
    categorias: [
        {
            identificador: Number,
            quantidade: Number
        }
    ],
    abecedarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Abecedario'
        }
    ],
    audios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audio'
        }
    ],
    entrevistas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entrevista'
        }
    ],
    producaoAcademica: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProducaoAcademica'
        }
    ],

    politica: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Politica'
        }
    ],

    escola: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Escola'
        }
    ],

    curso: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Curso'
        }
    ],

    cineclub: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cineclub'
        }
    ],


    createdAt: {
        type: Date,
        default: Date.now
    },


}, {
    versionKey: false
});


module.exports = mongoose.model('Point', PointsSchema);
