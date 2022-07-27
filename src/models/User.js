const Sequelize = require('sequelize');
const db = require('./dp');

const User = db.define('registerplayers',
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tel: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        birth: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nationality: {
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
        descripition: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        sexo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);

//User.sync();

module.exports = User;