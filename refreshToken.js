require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}
const user = {
  id: 1,
  name: 'MaNa',
  email: 'blabla@gmail.com',
};

const RefreshAccessToken = generateRefreshToken(user);
console.log('RefreshAccessToken : ', RefreshAccessToken);

module.exports = RefreshAccessToken;
