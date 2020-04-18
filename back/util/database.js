const Sequelize = require('sequelize') ;

const sequelize = new Sequelize('elsenya' , 'root' , '' , {
    dialect : 'mysql',
    host : 'localhost'
}) ;

module.exports = sequelize ;
