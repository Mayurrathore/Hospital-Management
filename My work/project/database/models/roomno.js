const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roomno', {
    roomno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idwr1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roomtypewardtype',
        key: 'idwr'
      }
    }
  }, {
    sequelize,
    tableName: 'roomno',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roomno" },
        ]
      },
      {
        name: "idwr1",
        using: "BTREE",
        fields: [
          { name: "idwr1" },
        ]
      },
    ]
  });
};
