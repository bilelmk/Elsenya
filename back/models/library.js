const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const LibraryResource = require("./library-ressource");

const Library = sequelize.define("library", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Library.hasMany(LibraryResource);
LibraryResource.belongsTo(Library);

module.exports = Library;
