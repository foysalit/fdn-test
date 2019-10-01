const { Router } = require('express');

const router = Router();

router.get('/hello', (request, response) => response.send('world'));

module.exports = router;