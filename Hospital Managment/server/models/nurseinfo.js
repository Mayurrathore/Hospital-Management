const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurseinfo', {
    nid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nmobileno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    naddress: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ncity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nemail: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wardinfo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'wardtypes',
        key: 'wardtype'
      }
    }
  }, {
    sequelize,
    tableName: 'nurseinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nid" },
        ]
      },
      {
        name: "wardinfo",
        using: "BTREE",
        fields: [
          { name: "wardinfo" },
        ]
      },
    ]
  });
};
