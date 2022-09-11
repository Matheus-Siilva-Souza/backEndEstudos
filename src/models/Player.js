const Sequelize = require('sequelize');
const db = require('./dp');
const Team = require("./Teams");

const Player = db.define('Players',
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
        position: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cap: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }
);

// User.sync({alter: true})

Team.hasOne(Player, {
    constraint: true,
    foreignKey: 'idTeam'
});
Player.belongsTo(Team)


module.exports = Player;