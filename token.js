require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}
const user = {
  id: 1,
  name: 'MaNa',
  email: 'blabla@gmail.com',
};

const accessToken = generateAccessToken(user);
console.log('access token dans le generateur : ', accessToken);

module.exports = accessToken;
