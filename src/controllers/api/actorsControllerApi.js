// * Traigo los modelos de la db para usarlos como la API
const db = require('../../database/models');

module.exports = {
  //* Listo todas los actores
  list: (req, res) => {
    db.Actor.findAll()
      .then(actors => {
        // * Configuro el status 200 (si la petición es exitosa)
        // * Traigo el total de datos del array
        // * Configuro la URL del endpoint
        const response = {
          meta: {
            status: 200,
            total: actors.length,
            url: req.url
          },
          //* la data son los actores que vienen de la db
          data: actors
        }
        //* Uso res.Json para que los datos sean Json y se puedan consumir
        res.json(response);
      })

  },
  //*Detalle del actor pedida por parametro
  detail: (req, res) => {
    db.Actor.findByPk(req.params.id)
      .then(actor => {
        const response = {
          meta: {
            status: 200,
            url: req.url
          },
          //* la data son los actores que vienen de la db
          data: actor
        }
        res.json(response);
      })
  }
}