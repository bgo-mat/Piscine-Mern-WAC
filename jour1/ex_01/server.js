const express = require('express');
const config = require('./config/config');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(config.port, config.host, () => {
    console.log(`Server listening on ${config.host}:${config.port}`);
});
