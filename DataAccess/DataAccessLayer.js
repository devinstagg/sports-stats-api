const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_CONNECTION;

const getConnectedClient = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect()
}

const getAllNflTeams = async () => {
    const client = await getConnectedClient()

    try {
        const collection = await client.db("sports-stats").collection("nfl-teams");
        return await collection.find().toArray()
    } finally {
        await client.close();
    }
}

module.exports = { getAllNflTeams }