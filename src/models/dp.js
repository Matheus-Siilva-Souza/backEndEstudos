const Sequelize = require('sequelize');

const sequelize = new Sequelize('meubanco','root','', {
    host: 'localhost',
    dialect:'mysql'
});

sequelize.authenticate()
.then(function() {
    return console.log("Conectou no Banco")
}).catch(function() {
    return console.log("Não conectou no Banco")
})

module.exports = sequelize;