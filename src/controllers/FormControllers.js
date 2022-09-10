const express = require("express");
const routerForm = express.Router();
const Formation = require('../models/FormToTeam');

routerForm.post("/creatFormation", async function (req, res) {
    try {
        const data = req.body
        console.log(data)
        const position = await Formation.create({
            name: data.nameForm,
            idTeam: data.idTeam,
            idPlayers: data.idPlayers,
            positions: data.positions,
        })
        return res.json({
            position: position
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Formação não Cadastrada!",
            error: error.message
        })
    }
})


module.exports = routerForm;