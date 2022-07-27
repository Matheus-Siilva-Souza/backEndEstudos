const express = require("express");
const app = express();
const User = require('./models/User')
const cors = require('cors');
const data = []

app.use(express.json());
app.use(cors())

app.post("/cadastrar", async (req, res) => {
    await Promise.all( req.body.forEach((element, index) => {
        data[index] = req.body[index]
        User.create(element)
    }))
    .then(() => {
        return res.json({
            mensagen: "Usuário cadastrado com sucesso!"
        });
    })
    .catch(() => {
        return res.status(400).json({
            error: true,
            mensagen: "Erro: Usuário não cadastrado!"
        })
    })
    // console.log(data)
})


app.listen(8080)