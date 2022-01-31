const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const { generateLink, getLinks, getLinkById } = require('../controllers/link-contoller');
const auth = require('../middleware/auth-middleware')


const router = Router();

router.route('/generate').post(auth, generateLink);

router.route('/').get(auth, getLinks);

router.route('/:id').get(auth, getLinkById);

module.exports = router;