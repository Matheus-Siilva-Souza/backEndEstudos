
(async () => {

    const uploadUserImage = require("./middlewares/uploadImage");
    const routerPlayer = require("./controllers/PlayerControllers");
    const routerTeam = require("./controllers/TeamControllers");
    const routerUser = require("./controllers/UserControllers");
    const routerForm = require("./controllers/FormControllers");
    const TeamName = require("./models/Teams");
    const Teams = require("./models/Teams");
    const Player = require('./models/Player');
    const express = require("express");
    const db = require('./models/dp');
    const cors = require('cors');
    const path = require("path");
    const app = express();
    const LogoTeam = ""
    // await db.sync({force:true})
    app.use(express.json());
    app.use(cors());
    app.use(routerTeam);
    app.use(routerPlayer);
    app.use(routerUser);
    app.use(routerForm);

    // http://localhost:8080/files/users/1660003473324_images.png
    app.use("/files", express.static(path.resolve(__dirname, "public", "upload")))

    app.post("/upload-image", uploadUserImage.single("image"), async (req, res) => {
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



    app.listen(8080)
})();
