const express = require("express");
const app = express();
const User = require('./models/User')
const TeamName = require("./models/NameTeams")
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.post("/cadastrar", async function (req, res) {
    const data = req.body
    console.log(data)
    if (!data) {
        console.log("Dados não encontrados!");
        return res.status(400).send({ error: true, message: "Produtos não encontrados" });
    }
    const promiseTeam = TeamName.create(data.nameTeam)
    const promise = data.data.map((user) => { return User.create(user) })
    try {
        await Promise.all([promise, promiseTeam])
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

app.listen(8080)