const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/user');

const signUpValidation = [
  body('name').isString(),
  body('email')
    .isEmail()
    .custom(async (value) => {
      try {
        const user = await User.findOne({
          where: {
            email: value,
          },
        });

        if (user) {
          return Promise.reject('Email already in use');
        }

        return true;
      } catch (err) {
        console.log(err);
      }
    }),
  body('password').isString(),
];

const signInValidation = [
  body('email').isEmail(),
  body('password').isString(),
];

router.post('/signup', signUpValidation, authController.signUp);
router.post('/signin', signInValidation, authController.signIn);

module.exports = router;
