const { MongoClient, ObjectId } = require('mongodb');
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
        const collection = await getNflTeamsCollection(client)
        await collection.insertOne(nflTeam)
    } finally {
        client.close()
    }
}

const editNflTeam = async (nflTeam) => {
    const client = await getConnectedClient()
    const { _id, ...nflTeamToUpdate } = nflTeam

    try { 
        const collection = getNflTeamsCollection(client)
        await collection.updateOne({ _id: ObjectId(_id)} , {
            $set: nflTeamToUpdate
        })
    } finally {
        client.close()
    }
}

const deleteNflTeam = async (nflTeamId) => {
    const client = await getConnectedClient()

    try {
        const collection = await getNflTeamsCollection(client)
        await collection.deleteOne({ _id: ObjectId(nflTeamId)})
    } finally {
        client.close()
    }
} 

module.exports = { 
    getAllNflTeams,
    createNflTeam,
    deleteNflTeam,
    editNflTeam
 }