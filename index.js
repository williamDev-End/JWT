const express = require('express');
const refreshTokken = require('./refreshToken');
const generatedToken = require('./token');
const { authenticateToken, refreshAuthenticateToken } = require('./middlewareTokken');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {
  console.log(generatedToken);
  if (req.body.email !== 'blabla@gmail.com') {
    res.status(401).send('invalid credentials');
    return;
  }
  if (req.body.password !== 'test') {
    res.status(401).send('invalid credentials');
    return;
  }
  res.send({
    generatedToken,
    refreshTokken,
  });
});

app.get('/api/:id', authenticateToken, (req, res) => {
  console.log('user info : ', req.user.id);
  console.log('request id : ', req.params.id);
  res.send(req.user);
});
app.get('/api/1/profil', authenticateToken, (req, res) => {
  res.send(req.user);
});
app.get('/api/2/profil', authenticateToken, (req, res) => {
  if (req.user.id === 2) {
    res.send(req.user);
  }
});
app.post('/api/refreshtoken', refreshAuthenticateToken);

app.listen(3000, () => console.log('http://localhost:3000'));
