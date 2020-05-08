const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const InformationResource = sequelize.define('information-resource' , {
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

module.exports = InformationResource ;
