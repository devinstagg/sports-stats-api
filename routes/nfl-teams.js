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

module.exports = router;