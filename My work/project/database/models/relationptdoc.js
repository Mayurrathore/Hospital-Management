const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relationptdoc', {
    rid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patientinfo',
        key: 'ptid'
      }
    },
    docid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctorinfo',
        key: 'did'
      }
    }
  }, {
    sequelize,
    tableName: 'relationptdoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rid" },
        ]
      },
      {
        name: "patid",
        using: "BTREE",
        fields: [
          { name: "patid" },
        ]
      },
      {
        name: "docid",
        using: "BTREE",
        fields: [
          { name: "docid" },
        ]
      },
    ]
  });
};
