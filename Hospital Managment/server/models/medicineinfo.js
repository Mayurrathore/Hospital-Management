const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicineinfo', {
    medicineid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    medicinetype: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    manufacturedate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expirydate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    inwarddate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    unitprice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'medicineinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "medicineid" },
        ]
      },
    ]
  });
};
