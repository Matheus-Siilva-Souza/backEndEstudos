const Sequelize = require('sequelize');

const sequelize = new Sequelize('meubanco', 'root', '', {
     host: 'localhost',
     dialect: 'mysql'
});

sequelize.authenticate()
     .then(function () {
          console.log("Conectou no Banco")
     }).catch(function () {
          console.log("Não conectou no Banco")
     })

module.exports = sequelize;