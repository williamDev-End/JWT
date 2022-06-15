require('dotenv').config();
const jwt = require('jsonwebtoken');
const userToken = require('./token');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    const userId = Number(req.params.id);
    const userInfos = Number(user.id);
    console.log('user Id : ', userId);
    console.log('user Id dans user : ', userInfos);
    if (err) {
      console.log('err');
      return res.sendStatus(401);
    }
    if (userId !== userInfos) {
      console.log('pas bon');
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}

function refreshAuthenticateToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    delete user.iat;
    const refreshedToken = userToken;
    res.send({
      accessToken: refreshedToken,
    });
  });
}

module.exports = { authenticateToken, refreshAuthenticateToken };
