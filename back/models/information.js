const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Resource = require("./resource");

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

Information.hasMany(Resource);
Resource.belongsTo(Information);

module.exports = Information;
