// * Traigo los modelos de la db para usarlos como la API
const db = require('../../database/models');

module.exports = {
  //* Listo todas las peliculas
  list: (req, res) => {
    db.Movie.findAll()
      .then(movies => {
        // * Configuro el status 200 (si la petición es exitosa)
        // * Traigo el total de datos del array
        // * Configuro la URL del endpoint
        const response = {
          meta: {
            status: 200,
            total: movies.length,
            url: req.url
          },
          //* la data son las peliculas que vienen de la db
          data: movies
        }
        //* Uso res.Json para que los datos sean Json y se puedan consumir
        res.json(response);
      })

  },
  //*Detalle de la pelicula pedida por parametro
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id)
      .then(movie => {
        const response = {
          meta: {
            status: 200,
            url: req.url
          },
          //* la data son las peliculas que vienen de la db
          data: movie
        }
        res.json(response);
      })
  },
  createMovieApi: (req, res)=> {
    const pelicula=db.Movie
      .create(
        {
          title: req.body.title,
          rating: req.body.rating,
          awards: req.body.awards,
          release_date: req.body.release_date,
          length: req.body.length,
          genre_id: req.body.genre_id
        }
      )
    res.json({
      operation: { type: "Add", status: "Se creó la pelicula" },
      pelicula})
      .then(() => {
        return res.redirect('/movies')
      })
      //* Cuando mando el error mando el status del mismo y un msj
      .catch(error => res.json({
        error: error.toString().trim().slice().split("Error: ")[1],
        status: "La pelicula no fue creada"
      }))
  },
  destroyMovieApi:  (req, res) =>{
    let movieId = req.params.id;
    db.Movie
      .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.json({
          operation: { type: "Delete", status: "Se borró con éxito." },
        
      })
      })
          .catch(error => res.json({
            error: error.toString().trim().slice().split("Error: ")[1],
            status: "La pelicula no se pudo borrar."
          }))
     }
}