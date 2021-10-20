const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cantineinfo', {
    foodid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    foodname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    foodquantity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    foodtype: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cantineinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "foodid" },
        ]
      },
    ]
  });
};
