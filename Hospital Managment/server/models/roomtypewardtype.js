const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roomtypewardtype', {
    idwr: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wardtype1: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'wardtypes',
        key: 'wardtype'
      }
    },
    roomtype1: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'roomtypes',
        key: 'roomtype'
      }
    },
    roomfeesperday: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roomtypewardtype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idwr" },
        ]
      },
      {
        name: "wardtype1",
        using: "BTREE",
        fields: [
          { name: "wardtype1" },
        ]
      },
      {
        name: "roomtype1",
        using: "BTREE",
        fields: [
          { name: "roomtype1" },
        ]
      },
    ]
  });
};
