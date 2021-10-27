const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patientinfo', {
    ptid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ptname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Paddress: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ptcity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ptage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ptgender: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ptdob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ptdisease: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    pttype: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Admited: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'doctorinfo',
        key: 'dname'
      }
    },
    idwr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roomtypewardtype',
        key: 'idwr'
      }
    }
  }, {
    sequelize,
    tableName: 'patientinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ptid" },
        ]
      },
      {
        name: "wardtype",
        using: "BTREE",
        fields: [
          { name: "idwr" },
        ]
      },
      {
        name: "dname",
        using: "BTREE",
        fields: [
          { name: "dname" },
        ]
      },
    ]
  });
};
