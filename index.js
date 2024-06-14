const dotenv = require('dotenv');

dotenv.config();

require('./model/db');
const express = require('express');

const app = express();
app.use(express.json());
const port = 3000;
const users = require('./api_v1/users');

app.use('/user', users);

// Start Express server only if database connection is successful
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode,
    message: err.message,
  });
});
