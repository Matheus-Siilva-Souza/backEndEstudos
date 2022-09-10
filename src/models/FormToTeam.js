const Sequelize = require('sequelize');
const db = require('./dp');
const Team = require("./Teams");

const Formation = db.define('Formation',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        idTeam: {
            type: Sequelize.INTEGER,
        },
        idPlayers: {
            type: Sequelize.JSON,
        },
        positions: {
            type: Sequelize.JSON,
            allowNull: false,
        },
    }
);

// Formation.sync({alter: true})
// Team.hasOne(Formation, {
//     constraint: true,
//     foreignKey: 'idTeam'
// });
// Formation.belongsTo(Team)

module.exports = Formation;