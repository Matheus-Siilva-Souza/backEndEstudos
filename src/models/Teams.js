const Sequelize = require('sequelize');
const db = require("./dp");


const Team = db.define('Teams',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nameTeam: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING
        }
    }
);
// Team.sync({ alter: true })

module.exports = Team;