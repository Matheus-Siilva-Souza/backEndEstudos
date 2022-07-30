const Sequelize = require('sequelize');
const db = require("./dp");


const TeamName = db.define('Teams',
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nameTeam: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}
);

// TeamName.sync();

module.exports = TeamName;