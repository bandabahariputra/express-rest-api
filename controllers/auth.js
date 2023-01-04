const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      user: savedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

const signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (matchedPassword) {
      jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        'secret',
        {
          expiresIn: '1h',
        },
        (err, token) => {
          res.json({
            ststus: 'success',
            user,
            token,
          });
        },
      );
    } else {
      res.status(422).json({
        ststus: 'error',
        message: 'Password not match',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
