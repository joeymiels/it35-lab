// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = '6LdtTUorAAAAANb0nUeP0_pZISnmtqW6jJu4qWHy';

app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${SECRET_KEY}&response=${token}`,
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3001, () => {
  console.log('reCAPTCHA verification server running on http://localhost:3001');
});
