const express = require("express");
const routerPlayer = express.Router();
const Player = require('../models/Player');

routerPlayer.get("/player/:id", async function (req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const player = await Player.findOne(
            {
                where: { id: id }
            }

        );
        return res.json({
            player: player,
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Jogador não encontrado!",
            error: error.message
        })
    }
})

routerPlayer.post("/update/player/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data)
        const upDatePlayer = await Player.update(
            {
                name: data.name,
                position: data.position,
                cap: data.cap,
                idTeam: data.idTeam,
                id: id
            },
            {
                where: { id: id }
            }
        );
        return res.json({
            upDatePlayer
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Jogador não encontrado!",
            error: error.message
        })
    }
});

routerPlayer.get("/delete/player/:id", async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        const deletePlayer = await Player.destroy(
            {
                where: {
                    id: id
                }
            }
        );
        return res.json({
            deletePlayer,
            mensagen: "Jogador deletado com sucesso!",
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Jogador não deletado!",
            error: error.message
        })
    }
});



module.exports = routerPlayer;