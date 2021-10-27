var DataTypes = require("sequelize").DataTypes;
var _bill = require("./bill");

function initModels(sequelize) {
  var bill = _bill(sequelize, DataTypes);


  return {
    bill,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
