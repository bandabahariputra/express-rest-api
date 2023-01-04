const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json('Not authenticated');
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(401).json(err.message);
  }

  if (decodedToken) {
    req.userId = decodedToken.userId;
    next();
  } else {
    return res.status(401).json('Unauthorized');
  }
};
