// * Traigo los modelos de la db para usarlos como la API
const db = require('../../database/models');

module.exports = {
  //* Listo todos los generos
    list: (req,res) =>{
        db.Genre.findAll()
        .then(genres => {
          // * Configuro el status 200 (si la petición es exitosa)
          // * Traigo el total de datos del array
          // * Configuro la URL del endpoint
            const response = {
                meta:{
                    status:200,
                    total : genres.length,
                    url: req.url
                },
                //* la data son los generos que vienen de la db
                data : genres
            }
            //* Uso res.Json para que los datos sean Json y se puedan consumir
            res.json(response);
        })
    
    }, 
    //*Detalle del genero por parametro
    detail: (req,res) =>{
        db.Genre.findByPk(req.params.id)
            .then(genre =>{
                const response ={
                    meta: {
                        status: 200,
                        url: req.url
                    },
                    //* la data son los generos que vienen de la db
                    data: genre
                }
                res.json(response);
            })
    }
}