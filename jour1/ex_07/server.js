const express = require('express');
const config = require('./config/config');
const server = express();

var myMERN_module = require ( './myMERN_module.js') ;


server.get('/files/:name', (req, res) => {
    var name =req.params.name;
     myMERN_module.read(name, res);
});

server.post('/files/:name', (req, res) => {
    var name =req.params.name;
  myMERN_module.create(name,res);
});

server.put('/files/:name/:content', (req, res) => {
    var name =req.params.name;
    var content =req.params.content;
   myMERN_module.update(name, content,res);
});

server.delete('/files/:name', (req, res) => {
    var name =req.params.name;
    myMERN_module.delete(name ,res)
});


server.listen(config.port, config.host, () => {
    console.log(`Server listening on ${config.host}:${config.port}`);
});
