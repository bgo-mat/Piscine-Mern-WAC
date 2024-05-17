const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const crypto = require('crypto')

const server = express();
let database;
let collectionUsers;
let collectionArticles;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

async function main() {
    const uri = "mongodb://localhost:27042";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        database = client.db("mern-pool3");
        collectionUsers = database.collection('users');
        collectionArticles = database.collection('articles');
        console.log("Connection successful.");
    } catch (error) {
        console.log("Connection failed.", error);
    }

    server.listen(config.port, config.host, () => {
        console.log(`Server listening on ${config.host}:${config.port}`);
    });
}

async function createUser(input) {
    try {

        const result = await collectionUsers.insertOne(input);
        const user = await collectionUsers.find({ _id: result.insertedId }).toArray();


        const res = { message: "Register successful.", id: user[0].Id };
        return res;
    } catch (error) {
        return { message: "Error : " + error };
    }
}

async function logUser(input) {
    try {
        const user = await collectionUsers.findOne({ email: input.email });

        if (user && user.password === input.password) {

            const res = { message: "Login successful.", id: user.Id };
            return res;
        } else {
            return "Invalid email or password.";
        }
    } catch (error) {
        return "Error: " + error;
    }
}

async function getUser(input) {
    try {
        const user = await collectionUsers.find({ Id: parseInt(input.userId )}).toArray();

        if(!user[0]){
            return "Undefined"
        }
        return user;
    } catch (error) {
        return "Error: " + error;
    }
}

async function getAllArticles(){

    try {

        const res = await collectionArticles.find().toArray();

        return res;
    } catch (error) {
        return "Error : " + error;
    }
}

async function createArticle(input) {
    try {

         await collectionArticles.insertOne(input);

        return "Add successful.";
    } catch (error) {
        return "Error : " + error;
    }
}

async function getArticleDetail(input) {
    try {
        const article = await collectionArticles.find({ id: parseInt(input.articleId )}).toArray();

        if(!article[0]){
            return "Undefined"
        }
        return article;
    } catch (error) {
        return "Error: " + error;
    }
}

server.post('/register', async (req, res) => {

    const data = req.body;

    const shasum = crypto.createHash('sha1');
    const hashPass = shasum.update(req.body.password).digest('hex');

    data.password = hashPass;
    data.Id = await collectionUsers.countDocuments() + 1;
    data.admin = false;

    try {
        const result = await createUser(data);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/login', async (req, res) => {

    const data = req.body;

    const shasum = crypto.createHash('sha1');
    const hashPass = shasum.update(req.body.password).digest('hex');

    data.password = hashPass;
    data.Id = await collectionUsers.countDocuments() + 1;
    data.admin = false;


    try {
        const result = await logUser(data);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/getUser', async (req, res) => {

    const data = req.body;

    try {
        const result = await getUser(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/createArticle', async (req, res) => {

    const data = req.body;
    data.id = await collectionArticles.countDocuments() + 1;

    data.price=parseInt(req.body.price);

    try {

        const result = await createArticle(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.get('/getArticle', async (req, res) => {

    try {
        const result = await getAllArticles();

        res.status(200).json({ result: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/getArticleDetail', async (req, res) => {

    const data = req.body;

    try {
        const result = await getArticleDetail(data);

        res.status(200).json({ result: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



main().catch(console.error);
