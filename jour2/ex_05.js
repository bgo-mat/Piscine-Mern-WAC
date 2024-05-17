const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const server = express();
let database;
let collection;

async function main() {
    const uri = "mongodb://localhost:27042";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        database = client.db("mern-pool");
        collection = database.collection('students'); // Initialiser la collection ici
        console.log("Connection successful.");
    } catch (error) {
        console.log("Connection failed.", error);
    }

    server.listen(config.port, config.host, () => {
        console.log(`Server listening on ${config.host}:${config.port}`);
    });
}

async function add(input) {
    try {
        await collection.insertOne(input);
        return "Document saved.";
    } catch (error) {
        return "Failed to save the document: " + error;
    }
}

server.set('view engine', 'ejs');
server.set('views', './vue');
server.engine('html', require('ejs').renderFile);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.render('ex_05.html', { response: "Send data to see response" });
});

server.post('/create', async (req, res) => {


    const formData = req.body;

    formData.Id = await collection.countDocuments() + 1;
    formData.admin = true;

    const result = await add(formData);

    res.render('ex_05.html', { response: result });
});

main().catch(console.error);
