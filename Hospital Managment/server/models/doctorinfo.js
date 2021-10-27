const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctorinfo', {
    did: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "dname_UNIQUE"
    },
    daddress: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dgender: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dspecalization: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dmobileno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dfeespervisit: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctorinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "did" },
        ]
      },
      {
        name: "dname_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dname" },
        ]
      },
    ]
  });
};
