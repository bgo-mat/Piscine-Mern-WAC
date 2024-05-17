const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const server = express();
let database;
let collection;

server.set('view engine', 'ejs');
server.set('views', './vue');
server.engine('html', require('ejs').renderFile);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

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

async function getStudentsInfo() {
    try {
        const response = await collection.find({ validated: "in progress" }).sort({ lastname: 1 }).toArray();
        return response;
    } catch (error) {
        throw new Error("error : " + error);
    }
}

server.get('/', async (req, res) => {


    const students = await getStudentsInfo();
    res.render('ex_06.html', { students });
})


main().catch(console.error);
