const { Router } = require('express');
const {
  generateLink,
  getLinks,
  getLinkById,
} = require('../controllers/link-contoller');
const auth = require('../middleware/auth-middleware');

const router = Router();

router.route('/generate').post(auth, generateLink);

router.route('/:id').get(auth, getLinkById);

router.route('/').get(auth, getLinks);

module.exports = router;
