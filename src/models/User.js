const Sequelize = require('sequelize');
const db = require('./dp');
const Team = require("./Teams");

const User = db.define('Players',
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

Team.hasOne(User, {
    constraint: true,
    foreignKey: 'idTeam'
});
User.belongsTo(Team)


module.exports = User;