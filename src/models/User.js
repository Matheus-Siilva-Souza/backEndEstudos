const Sequelize = require('sequelize');
const db = require('./dp');

const User = db.define('players',
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
        },
    }
);

//User.sync();

module.exports = User;