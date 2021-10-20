const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "UserName_UNIQUE"
    },
    Password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "PAsswordl_UNIQUE"
    },
    desgination: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "UserName_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserName" },
        ]
      },
      {
        name: "PAsswordl_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Password" },
        ]
      },
    ]
  });
};
