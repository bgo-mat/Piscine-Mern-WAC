const express = require('express');
const config = require('./config/config');
const server = express();

server.get('/', (req, res) => {
    res.send('Great ! It works.');
});

server.listen(config.port, config.host, () => {
    console.log(`Server listening on ${config.host}:${config.port}`);
});
