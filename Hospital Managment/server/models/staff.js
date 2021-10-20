const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staffid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stafftype: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    staffpname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    snum: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sdob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salaray: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Designation: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Add: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
