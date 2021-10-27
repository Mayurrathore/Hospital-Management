const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    billno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Patient_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Patient_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Patient_Admited: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Patient_Discharge: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Doct_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Room_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Medicine_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Medicine_Amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Doc_fees: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Room_fees: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Total_amount: {
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
    ]
  });
};
