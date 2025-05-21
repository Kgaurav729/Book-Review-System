const express = require('express');
const app = express();


app.use(express.json());

app.use('/api', require('./routes/AuthRoutes'));
app.use('/api', require('./routes/BookRoutes'));
app.use('/api', require('./routes/ReviewRoutes'));

app.get('/', (req, res) => {
  res.send('Book Review API');
});

module.exports = app;