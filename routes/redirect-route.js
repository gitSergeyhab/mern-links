const { Router } = require('express');
const { getRedirect } = require('../controllers/redirect-controller');

const router = Router();

router.route('/:code').get(getRedirect);

module.exports = router;
