const express = require('express');
const app = express();


app.use(express.json());

app.use('/api', require('./routes/AuthRoutes'));


app.get('/', (req, res) => {
  res.send('Book Review API');
});

module.exports = app;