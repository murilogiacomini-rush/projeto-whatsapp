const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoute);

const port = 3000;
const server = 'localhost';

app.listen(port, () => {
    console.log(`servidor rodando em ${server}:${port}`);
});
