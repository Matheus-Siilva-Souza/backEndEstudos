(async () => {

    const express = require("express");
    const cors = require('cors');
    const { Op } = require('sequelize')
    const app = express();
    const User = require('./models/User');
    const Teams = require("./models/NameTeams");
    const TeamName = require("./models/NameTeams");
    const db = require('./models/dp');
    //await db.sync({force:true})
    app.use(express.json());
    app.use(cors());

    app.post("/cadastrar", async function (req, res) {
        const data = req.body
        console.log(data)
        if (!data) {
            console.log("Dados não encontrados!");
            return res.status(400).send({ error: true, message: "Produtos não encontrados" });
        }
        const team = await TeamName.create(data.nameTeam)
        const players = await data.data.map((user) => {
            return User.create({
                name: user.name,
                position: user.position,
                cap: user.cap,
                idTeam: team.id
            })
        })
        try {
            await Promise.all([team, players])
            return res.json({
                mensagen: "Usuário e Equipe cadastrados com sucesso!",
                users: data.data
            })
        } catch (error) {
            return res.status(400).json({
                mensagen: "Erro: Não cadastrado!",
                error,
            })
        }
    })

    app.get("/Team", async function (req, res) {
        const project = await Teams.findAll();
        if (project === null) {
            console.log('Not found!');
        }
        return res.json({
            mensagen: "Equipes Encontradas com sucesso!",
            users: project
        })
    })

    app.get("/Team/:id", async function (req, res) {
        try {
            const id = req.params.id
            console.log(id)
            const user = await User.findAll(
                {
                    where: {
                        idTeam: {
                            [Op.eq]: id,
                        }
                    }
                }
            );
            return res.json({
                mensagen: "Usuários encontrados com sucesso!",
                users: user
            })
        } catch (error) {
            return res.status(400).json({
                mensagen: "Erro: Não encontrado!",
                error: error.message
            })
        }
    })

    app.listen(8080)

})();
