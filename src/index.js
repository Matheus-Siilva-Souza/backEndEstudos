(async () => {

    const express = require("express");
    const cors = require('cors');
    const { Op } = require('sequelize')
    const app = express();
    const User = require('./models/User');
    const Teams = require("./models/NameTeams");
    const TeamName = require("./models/NameTeams");
    const path = require("path")
    const db = require('./models/dp');
    const LogoTeam = ""
    const uploadUserImage = require("./middlewares/uploadImage");
    //await db.sync({force:true})
    app.use(express.json());
    app.use(cors());

    // http://localhost:8080/files/users/1660003473324_images.png
    app.use("/files", express.static(path.resolve(__dirname, "public", "upload")))

    // app.get("/list-image/:id", async function (req, res) {
    //     try {
    //         const id = req.params.id
    //         console.log(id)
    //         const image = await TeamName.findAll(
    //             {
    //                 where: {
    //                     [Op.and]: [
    //                         { id: id },
    //                         { image: "" }
    //                     ]
    //                 }
    //             }
    //         )
    //         return res.json({
    //             erro: false,
    //             mensagem: "Encontrado com sucesso!",
    //             image
    //         })
    //     } catch (error) {
    //         return res.status(400).json({
    //             mensagen: "Erro: Image não encontrado!",
    //             error: error.message
    //         })
    //     }
    // });


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

    app.get("/player/:id", async function (req, res) {
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
    app.post("/update/player/:id", async function (req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            console.log(data)
            const upDatePlayer = await User.update(
                {
                    name: data.name,
                    position: data.position,
                    cap: data.cap,
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

    app.post("/update/Team/:id", async function (req, res) {
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

    app.get("/delete/player/:id", async function (req, res) {
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


    app.listen(8080)

})();
