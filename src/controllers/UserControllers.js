const express = require("express");
const routerUser = express.Router();
const User = require('../models/User');

routerUser.get("/player/:id", async function (req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const player = await User.findOne(
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

routerUser.post("/update/player/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data)
        const upDatePlayer = await User.update(
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

routerUser.get("/delete/player/:id", async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        const deletePlayer = await User.destroy(
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



module.exports = routerUser;