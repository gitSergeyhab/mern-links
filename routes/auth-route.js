const { Router } = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/user-contoller');

const PASSWORD_MIN_LENGTH = 6;

const router = Router();

router
  .route('/register')
  .post(
    [
      check('email', 'incorrect email').isEmail(),
      check(
        'password',
        `incorrect password: min len: ${PASSWORD_MIN_LENGTH}`
      ).isLength({ min: PASSWORD_MIN_LENGTH }),
    ],
    register
  );

router
  .route('/login')
  .post(
    [
      check('email', 'incorrect email').normalizeEmail().isEmail(),
      check(
        'password',
        `incorrect password: min len: ${PASSWORD_MIN_LENGTH}`
      ).isLength({ min: PASSWORD_MIN_LENGTH }),
    ],
    login
  );

module.exports = router;
