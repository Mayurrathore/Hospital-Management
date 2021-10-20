const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    billno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patientinfo',
        key: 'ptid'
      }
    },
    doctorfees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctorinfo',
        key: 'did'
      }
    },
    roomcharges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roomno',
        key: 'roomno'
      }
    },
    canteenbill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medicinebill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    labcharges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "billno" },
        ]
      },
      {
        name: "patientid",
        using: "BTREE",
        fields: [
          { name: "patientid" },
        ]
      },
      {
        name: "doctorfees",
        using: "BTREE",
        fields: [
          { name: "doctorfees" },
        ]
      },
      {
        name: "roomno",
        using: "BTREE",
        fields: [
          { name: "roomno" },
        ]
      },
    ]
  });
};
