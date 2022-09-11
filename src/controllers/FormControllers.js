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
});

routerForm.get("/form/:id", async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await Formation.findAll(
            {
                where: { idTeam: id }
            }
        )
        return res.json({
            result: result
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Houve um problema",
            error: error.message
        })
    }
});


module.exports = routerForm;