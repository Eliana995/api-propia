const express = require('express');
const { list, detail } = require('../../controllers/api/genresControllerApi');
const router = express.Router();

router.get('/', list);
router.get('/detail/:id', detail);

module.exports = router;