const express = require('express');
const { list, detail } = require('../../controllers/api/actorsControllerApi');

const router = express.Router();

//* /api/actors
router.get('/', list);
router.get('/detail/:id', detail);

module.exports = router;