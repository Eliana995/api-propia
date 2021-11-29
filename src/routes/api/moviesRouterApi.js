const express = require('express');
const { list, detail, createMovieApi, destroyMovieApi } = require('../../controllers/api/moviesControllerApi');

const router = express.Router();

//* /api/movies
router.get('/', list);
router.get('/detail/:id', detail);
router.post('/create', createMovieApi)
router.delete('/delete/:id', destroyMovieApi);
module.exports = router;