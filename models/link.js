'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Link.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Link.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    linkOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};