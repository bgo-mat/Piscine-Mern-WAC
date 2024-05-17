const express = require('express');
const config = require('./config/config');
const server = express();

server.set('view engine', 'ejs');
server.set('views', './vue');
server.engine('html', require('ejs').renderFile);

server.get('/', (req, res) => {
   return res.render('index.html');
});

server.listen(config.port, config.host, () => {
    console.log(`Server listening on ${config.host}:${config.port}`);
});
