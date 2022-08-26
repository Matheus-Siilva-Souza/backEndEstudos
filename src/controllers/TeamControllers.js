const express = require("express");
const routerTeam = express.Router();
const Teams = require("../models/Teams");
const User = require('../models/User');
const { Op } = require('sequelize');
const TeamName = require("../models/Teams");


routerTeam.get("/Team", async function (req, res) {
    const project = await Teams.findAll();
    if (project === null) {
        console.log('Not found!');
    }
    return res.json({
        mensagen: "Equipes Encontradas com sucesso!",
        users: project
    })
})

routerTeam.get("/Team/:id", async function (req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const goalkeeper = await User.findAll(
            {
                where: {
                    [Op.and]: [
                        { idTeam: id },
                        { position: "Goleiro" }
                    ]
                }
            }
        );
        const defense = await User.findAll(
            {
                where: {
                    [Op.and]: [
                        { idTeam: id },
                        { position: ["Zagueiro", "Segundo Zaguiro", "Lateral Direito", "Lateral Esquerdo"] }
                    ]
                }
            }
        );
        const midfield = await User.findAll(
            {
                where: {
                    [Op.and]: [
                        { idTeam: id },
                        { position: ["Volante", "Meio Campo", "Meia Atacante"] }
                    ]
                }
            }
        );
        const attacker = await User.findAll(
            {
                where: {
                    [Op.and]: [
                        { idTeam: id },
                        { position: ["Ponta Direita", "Ponta Esquerda", "Centroavante"] }
                    ]
                }
            }
        );

        return res.json({
            goalkeeper: goalkeeper,
            defense: defense,
            midfield: midfield,
            attacker: attacker
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Não encontrado!",
            error: error.message
        })
    }
})

routerTeam.post("/update/Team/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data)
        const upDatePlayer = await TeamName.update(
            {
                nameTeam: data.nameTeam,

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
            mensagen: "Erro: Equipe não encontrado!",
            error: error.message
        })
    }
});

routerTeam.get("/delete/Team/:id", async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        const deleteTeam = await TeamName.destroy(
            {
                where: {
                    id: id
                }
            }
        );
        return res.json({
            deleteTeam,
            mensagen: "Equipe deletada com sucesso!",
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Equipe não deletada!",
            error: error.message
        })
    }
});

module.exports = routerTeam;