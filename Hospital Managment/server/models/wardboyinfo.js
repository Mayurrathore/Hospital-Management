const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wardboyinfo', {
    wbid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wbname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wbmobileno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wbaddress: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wbcity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    wbemail: {
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
    tableName: 'wardboyinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wbid" },
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
