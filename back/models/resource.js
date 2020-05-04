const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const Resource = sequelize.define('resource' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true
    },
    title : {
        type : Sequelize.STRING ,
        allowNull : false ,
    },
    content : {
        type : Sequelize.STRING ,
        allowNull : true ,
    },
    type : {
        type : Sequelize.STRING ,
        allowNull : true ,
    },
});

module.exports = Resource ;
