
(async () => {

    const routerPlayer = require("./controllers/PlayerControllers");
    const routerTeam = require("./controllers/TeamControllers");
    const routerUser = require("./controllers/UserControllers");
    const routerForm = require("./controllers/FormControllers");
    const TeamName = require("./models/Teams");
    const Player = require('./models/Player');
    const express = require("express");
    const cors = require('cors');
    const path = require("path");
    const app = express();
    const jwt = require('jsonwebtoken');
    const uploadUserImage = require("./middlewares/uploadImage");

    
    app.use("/files", express.static(path.resolve(__dirname, "public", "upload")))
    app.use(express.json());
    app.use(cors());
    app.use(routerUser);
    app.use(verifyJWT)
    app.use(routerTeam);
    app.use(routerPlayer);
    app.use(routerForm);

    function verifyJWT(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            return (
                res.status(401).json({ auth: false, message: 'Token não informado.' })
            )
        }
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token inválido.' });

            req.userId = decoded.id;
            console.log("User Id: " + decoded.id, "token: " + token)
            return next()
        })

    }

    app.post("/upload-image", uploadUserImage.single("image"), async (req, res, next) => {
        try {
            return res.json({
                erro: false,
                mensagem: "Upload efetuado com sucesso!",
                image: req.file.filename
            })


        } catch (error) {
            return res.status(400).json({
                error: true,
                mensagen: "Erro: Upload não efeuado!",
            })
        }
    })

    app.post("/cadastrar", async function (req, res) {
        const data = req.body
        console.log(data)
        if (!data) {
            console.log("Dados não encontrados!");
            return res.status(400).send({ error: true, message: "Produtos não encontrados" });
        }
        const team = await TeamName.create({
            nameTeam: data.nameTeam.nameTeam,
            image: data.nameLogo
        })
        const players = await data.player.map((user) => {
            return Player.create({
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



    app.listen(8080)
})();
