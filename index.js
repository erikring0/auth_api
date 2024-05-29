const dotenv = require('dotenv');
dotenv.config();

require('./model/db')
const express = require('express');
const app = express();
const port = 3000;
const login = require('./api_v1/login');
const register = require('./api_v1/register')

app.use(express.json())
app.use('/login', login)
app.use('/register', register)

// Start Express server only if database connection is successful
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

