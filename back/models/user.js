const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const User = sequelize.define('user' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true
    },
    email : {
        type : Sequelize.STRING ,
        allowNull : false ,
        unique : true
    },
    password : {
            type : Sequelize.STRING ,
            allowNull : false ,
    },
    firstname : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    lastname : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    place : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    comment : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    agriculture : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    longitude : {
        type : Sequelize.DOUBLE ,
        allowNull : false ,
    },
    latitude : {
        type : Sequelize.DOUBLE ,
        allowNull : false ,
    }
});

module.exports = User ;
