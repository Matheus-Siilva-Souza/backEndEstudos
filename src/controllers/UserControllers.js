const express = require("express");
const routerUser = express.Router();
const User = require("../models/User");
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

routerUser.post("/createUser", async function (req, res) {
    try {
        // process.env.SECRET
        const data = req.body
        const result = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        var id = result.id
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({
            result: result,
            token: token
        })
    }
    catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Usuario não encontrado!",
            error: error.message
        })
    }
})

routerUser.get("/users", async function (req, res) {
    try {
        // const data = req.body
        // console.log(data)
        const result = await User.findAll()
        return res.json({
            result: result,
        })
    }
    catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Usuario não encontrado!",
            error: error.message
        })
    }
})
routerUser.post("/sessions", async function (req, res) {
    try {
        const data = req.body
        console.log(data)
        const result = await User.findOne(
            {
                where: {
                    email: data.email,
                    password: data.password
                }
            }
        )
        var id = result.id
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 5 // expires in 5min
        });
        return res.json({
            result: result,
            token: token
        })
    }
    catch (error) {
        return res.status(400).json({
            mensagen: "Erro: Usuario não encontrado!",
            error: error.message
        })
    }
})

//     verifyJWT(req, res)
// function verifyJWT(req, res, next) {
//     const token = req.headers['x-access-token'];
//     const id = req.headers
//     console.log(id)
//     if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

//     jwt.verify(token, process.env.SECRET, function (err, decoded) {
//         if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

//         // se tudo estiver ok, salva no request para uso posterior
//         id = decoded.id;
//         next();
//     });
// }
module.exports = routerUser;