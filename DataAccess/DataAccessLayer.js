const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_CONNECTION;

const getConnectedClient = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect()
}

const getNflTeamsCollection = async (client) => {
    return await client.db("sports-stats").collection("nfl-teams")
}

const getAllNflTeams = async () => {
    const client = await getConnectedClient()

    try {
        const collection = await getNflTeamsCollection(client)
        return await collection.find().toArray()
    } finally {
        await client.close();
    }
}

const createNflTeam = async (nflTeam) => {
    const client = await getConnectedClient()

    try {
        const collection = await getConnectedClient()
        await collection.insertOne(nflTeam)
    } finally {
        client.close()
    }
}

module.exports = { 
    getAllNflTeams,
    createNflTeam
 }