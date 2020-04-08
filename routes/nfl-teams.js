const express = require('express');
const router = express.Router();

const dataAccessLayer = require("../DataAccess/DataAccessLayer")


router.get('/', async (req, res) => {
    const allNflTeams = await dataAccessLayer.getAllNflTeams()
    res.send(allNflTeams)
})

module.exports = router;