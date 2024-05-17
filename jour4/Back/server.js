const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const crypto = require('crypto')

const server = express();
let database;
let collectionUsers;
let collectionTicket;
let collectionComments;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

async function main() {
    const uri = "mongodb://localhost:27042";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        database = client.db("mern-pool4");
        collectionUsers = database.collection('users');
        collectionTicket = database.collection('tickets');
        collectionComments = database.collection('comments');
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


        const res = { message: "Register successful.", id: user[0].id };
        return res;
    } catch (error) {
        return { message: "Error : " + error };
    }
}

async function logUser(input) {
    try {
        const user = await collectionUsers.findOne({ email: input.email });

        if (user && user.password === input.password) {

            const res = { message: "Login successful.", id: user.id };
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
        const user = await collectionUsers.find({ id: parseInt(input.userId )}).toArray();

        if(!user[0]){
            return "Undefined"
        }
        return user;
    } catch (error) {
        return "Error: " + error;
    }
}

async function createTicket(input) {
    try {
        const result = await collectionTicket.insertOne(input);


        const res = { message: "Register successful."};
        return res;
    } catch (error) {
        return { message: "Error : " + error };
    }
}

async function getAllTicket() {
    try {

        const ticket = await collectionTicket.find().toArray();

        return ticket;
    } catch (error) {
        return "Error: " + error;
    }
}

async function getPersonnalTicket(input) {
    try {
        const userId = await collectionUsers.find({ login: input}).toArray();

        const ticket = await collectionTicket.find({ id_user: userId[0].id}).toArray();

        return ticket;
    } catch (error) {
        return "No user";
    }
}

async function updateTicket(input) {
    try {
        const { id, ...updateFields } = input;
        const result = await collectionTicket.updateOne(
            { id: id },
            { $set: updateFields }
        );
        return "ok";
    } catch (error) {
        return "Error: " + error;
    }
}

async function deleteTicket(input) {

    try {

        const result = await collectionTicket.deleteOne({ id: input.id });

        return "ok";
    } catch (error) {
        return "Error : " + error ;
    }
}

async function getTicketById(input) {

    try {

        const result = await collectionTicket.find({ id:input.id }).toArray();

        return result;
    } catch (error) {
        return "Error : " + error ;
    }
}

async function createComment(input) {
    try {
        const result = await collectionComments.insertOne(input);

        return "ok";
    } catch (error) {
        return { message: "Error : " + error };
    }
}

async function getAllComment(input) {

    try {

        const result = await collectionComments.find({ id_ticket:input.id_ticket }).toArray();

        return result;
    } catch (error) {
        return "Error : " + error ;
    }
}

async function deleteComment(input) {

    try {

        const result = await collectionComments.deleteOne({ id: input.id });

        return "ok";
    } catch (error) {
        return "Error : " + error ;
    }
}

server.post('/register', async (req, res) => {

    const data = req.body;

    const shasum = crypto.createHash('sha1');
    const hashPass = shasum.update(req.body.password).digest('hex');

    data.password = hashPass;
    data.id = await collectionUsers.countDocuments() + getRandomInteger(1, 100000);
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
    data.id = await collectionUsers.countDocuments() + 1;
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

server.post('/createBlog', async (req, res) => {

    const data = req.body;
    data.id = await collectionTicket.countDocuments() + getRandomInteger(1, 100000);
    data.id_user=parseInt(req.body.userId);

    try {
        const result = await createTicket(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/updateBlog', async (req, res) => {

    const data = req.body;
    data.id_user=parseInt(req.body.userId);

    try {
        const result = await updateTicket(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/deleteBlog', async (req, res) => {

    const data = req.body;
    data.id_user=parseInt(req.body.userId);

    try {
        const result = await deleteTicket(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/getTicketById', async (req, res) => {

    const data = req.body;

    try {
        const result = await getTicketById(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.get('/:login', async (req, res) => {

    const data = req.params.login;

    try {
        const result = await getPersonnalTicket(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.get('/', async (req, res) => {

    try {
        const result = await getAllTicket();

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/createComment', async (req, res) => {

    const data = req.body;
    data.id = await collectionTicket.countDocuments() + getRandomInteger(1, 100000);
    data.id_user=parseInt(req.body.userId);
    data.id_ticket=parseInt(req.body.blogId);


    try {
        const result = await createComment(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/getAllComment', async (req, res) => {

    const data = req.body;


    try {
        const result = await getAllComment(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

server.post('/deleteComment', async (req, res) => {

    const data = req.body;

    try {
        const result = await deleteComment(data);

        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main().catch(console.error);

