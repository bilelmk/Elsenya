const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const InformationResource = require("./information-resource");

const Information = sequelize.define("information", {
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

Information.hasMany(InformationResource);
InformationResource.belongsTo(Information);

module.exports = Information;
