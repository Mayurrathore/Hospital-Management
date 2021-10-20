var DataTypes = require("sequelize").DataTypes;
var _productdetails = require("./productdetails");

function initModels(sequelize) {
  var productdetails = _productdetails(sequelize, DataTypes);


  return {
    productdetails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
