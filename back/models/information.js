const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const Information = sequelize.define('information' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true
    },
    content : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
});

module.exports = Information ;
