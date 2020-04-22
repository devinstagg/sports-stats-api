const express = require('express');
const router = express.Router();
const dataAccessLayer = require("../DataAccess/DataAccessLayer")


const isValidNflTeam = (nflTeam) => {
    const hasValidWins = !!nflTeam.regularSeasonWins2019
    return hasValidWins
}

router.get('/', async (req, res) => {
    const allNflTeams = await dataAccessLayer.getAllNflTeams()
    res.send(allNflTeams)
})

router.post('/', async (req, res) => {
    const nflTeam = req.body
    if (isValidNflTeam(nflTeam)) {
        await dataAccessLayer.createNflTeam(nflTeam)
        res.status(201).send(nflTeam)
    } else {
        res.status(400).send({
            nflTeam,
            message: 'Must include number of wins'
        })
    }
})

router.put('/', async (req, res) => {
    const nflTeam = req.body

    if (isValidNflTeam(nflTeam)) {
        await dataAccessLayer.editNflTeam(nflTeam)

        res.send(nflTeam)
    } else {
        res.status(400).send({
            nflTeam,
            message: 'Must include number of wins'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const nflTeamId = req.params.id

    await dataAccessLayer.deleteNflTeam(nflTeamId)

    res.send(nflTeamId)
})


module.exports = router;