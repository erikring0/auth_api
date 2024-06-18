const dotenv = require('dotenv');

dotenv.config();

require('./model/db');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
const port = 3000;
const users = require('./api_v1/users');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Authentication API',
      version: '1.0.0',
      description: 'API for user registration, login, and password reset',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./api_v1/users/*.js'],
};

const specs = swaggerJsDoc(options);

app.use('/user', users);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

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
