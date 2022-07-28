const express = require("express");
const app = express();
const User = require('./models/User')
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.post("/cadastrar", async function (req, res) {
    const data = req.body
    if (!data) {
        console.log("Produtos não encontrados!");
        return res.status(400).send({ error: true, message: "Produtos não encontrados" });
    }
    const promise = data.map((user) => { return User.create(user) })
    try {
        await Promise.all(promise)
        return res.json({
            mensagen: "Usuário cadastrado com sucesso!",
            users: data
        })
    } catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Usuário não cadastrado!",
            error,
        })
    }
})



app.listen(8080)