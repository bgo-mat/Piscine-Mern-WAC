const express = require('express');
const config = require('./config/config');
const server = express();

server.set('view engine', 'ejs');
server.set('views', './vue');
server.engine('html', require('ejs').renderFile);

server.get('/name/:name?', (req, res) => {

        var name =req.params.name || "unknown";
   return res.render('index.html', { myvar: name });
});


server.listen(config.port, config.host, () => {
    console.log(`Server listening on ${config.host}:${config.port}`);
});
