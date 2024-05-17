const {MongoClient} = require('mongodb');


async function main(){

    const uri = "mongodb://localhost:27042";
    const client = new MongoClient(uri);

    try {

        await client.connect();
        console.log("Connection successfull.");

        const database = client.db("mern-pool");

    } catch (error) {
        console.log("Connection failed.");
    }
}

main();