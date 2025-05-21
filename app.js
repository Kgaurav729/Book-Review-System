const express = require('express');
const app = express();
const {limiter,authLimiter}=require('./middlewares/RateLimiter');


app.use(express.json());
app.use(limiter);

app.use('/api', require('./routes/AuthRoutes'));
app.use('/api', require('./routes/BookRoutes'));
app.use('/api', require('./routes/ReviewRoutes'));
app.use('/api/signup', authLimiter);
app.use('/api/login', authLimiter);

app.get('/', (req, res) => {
  res.send('Book Review API');
});

module.exports = app;