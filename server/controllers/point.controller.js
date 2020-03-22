const Points = require('../models/points.model');
const Abecedario = require('../models/abecedario.model');
const Audio = require('../models/audio.model');
const Entrevista = require('../models/entrevista.model');
const ProducaoAcademica = require('../models/producaoAcademica.model');

const Escola = require('../models/escola.model');
const Politica = require('../models/politica.model');
const Curso = require('../models/curso.model');
const Cineclub = require('../models/cineclub.model');


module.exports = {
  getPointsByCategoria,
  getPointsByCoordinator,
  getAbecedarioPointAdmin,
  getAudioPointAdmin,
  getEntrevistaPointAdmin,
  getProducaoAcademicaPointAdmin,
  getEscolaPointAdmin,
  getPoliticaPointAdmin,
  getCursoPointAdmin,
  getCineclubPointAdmin,
  getContentOfPoint,
  create,
  getPointsByCategoriaAdmin,

}

async function create(point) {
  return await new Points(point).save();
}

async function getPointsByCoordinator(lat, lng) {
  return await Points.findOne({
    'lat': lat,
    'lng': lng
  });
}


async function getContentOfPoint(req) {

  switch (Number(req.params.categoriaId)) {
    case 1:
      return await getAbecedarioPoint(req);
    case 2:
      return await getEntrevistaPoint(req);
    case 3:
      return await getAudioPoint(req);
    case 4:
      return await getProducaoAcademicaPoint(req);
    case 5:
      return await getPoliticaPoint(req);
    case 6:
      return await getEscolaPoint(req);
    case 7:
      return await getCursoPoint(req);
    case 8:
      return await getCineclubPoint(req);
    default:

      break;
  }
}

async function getPointsByCategoria(req) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Points.find({
        abecedarios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 2:
      return await Points.find({
        entrevistas: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 3:
      return await Points.find({
        audios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 4:
      return await Points.find({
        producaoAcademica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 5:
      return await Points.find({
        politica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 6:
      return await Points.find({
        escola: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 7:
      return await Points.find({
        curso: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 8:
      return await Points.find({
        cineclub: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    default:
      break;
  }
}


async function getPointsByCategoriaAdmin(req) {
  switch (Number(req.params.categoriaId)) {
    case 1:
      return await Points.find({
        abecedarios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 2:
      return await Points.find({
        entrevistas: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 3:
      return await Points.find({
        audios: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 4:
      return await Points.find({
        producaoAcademica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 5:
      return await Points.find({
        politica: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 6:
      return await Points.find({
        escola: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 7:
      return await Points.find({
        curso: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    case 8:
      return await Points.find({
        cineclub: {
          $gt: []
        }
      })
        .sort({
          createAt: 1
        });

    default:
      break;
  }
}

async function getAbecedarioPoint(req) {
  return await Abecedario.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getAbecedarioPointAdmin(req) {
  return await Abecedario.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getAudioPoint(req) {
  return await Audio.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}


async function getAudioPointAdmin(req) {
  return await Audio.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getEntrevistaPoint(req) {
  return await Entrevista.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getEntrevistaPointAdmin(req) {
  return await Entrevista.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getProducaoAcademicaPoint(req) {
  return await ProducaoAcademica.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getProducaoAcademicaPointAdmin(req) {
  return await ProducaoAcademica.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

async function getPoliticaPoint(req) {
  return await Politica.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getPoliticaPointAdmin(req) {
  return await Politica.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getEscolaPoint(req) {
  return await Escola.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getEscolaPointAdmin(req) {
  return await Escola.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getCursoPoint(req) {
  return await Curso.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getCursoPointAdmin(req) {
  return await Curso.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}


async function getCineclubPoint(req) {
  return await Cineclub.find({
    pointId: req.params.pointId,
    icAprovado: true
  })
    .sort({
      createAt: 1
    });
}

async function getCineclubPointAdmin(req) {
  return await Cineclub.find({
    pointId: req.params.pointId
  })
    .sort({
      createAt: 1
    });
}

