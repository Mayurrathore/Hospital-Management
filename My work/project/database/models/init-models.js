var DataTypes = require("sequelize").DataTypes;
var _bill = require("./bill");
var _cantineinfo = require("./cantineinfo");
var _doctorinfo = require("./doctorinfo");
var _nurseinfo = require("./nurseinfo");
var _patientinfo = require("./patientinfo");
var _relationptdoc = require("./relationptdoc");
var _roomno = require("./roomno");
var _roomtypes = require("./roomtypes");
var _roomtypewardtype = require("./roomtypewardtype");
var _wardboyinfo = require("./wardboyinfo");

function initModels(sequelize) {
  var bill = _bill(sequelize, DataTypes);
  var cantineinfo = _cantineinfo(sequelize, DataTypes);
  var doctorinfo = _doctorinfo(sequelize, DataTypes);
  var nurseinfo = _nurseinfo(sequelize, DataTypes);
  var patientinfo = _patientinfo(sequelize, DataTypes);
  var relationptdoc = _relationptdoc(sequelize, DataTypes);
  var roomno = _roomno(sequelize, DataTypes);
  var roomtypes = _roomtypes(sequelize, DataTypes);
  var roomtypewardtype = _roomtypewardtype(sequelize, DataTypes);
  var wardboyinfo = _wardboyinfo(sequelize, DataTypes);

  bill.belongsTo(doctorinfo, { as: "doctorfees_doctorinfo", foreignKey: "doctorfees"});
  doctorinfo.hasMany(bill, { as: "bills", foreignKey: "doctorfees"});
  relationptdoc.belongsTo(doctorinfo, { as: "doc", foreignKey: "docid"});
  doctorinfo.hasMany(relationptdoc, { as: "relationptdocs", foreignKey: "docid"});
  bill.belongsTo(patientinfo, { as: "patient", foreignKey: "patientid"});
  patientinfo.hasMany(bill, { as: "bills", foreignKey: "patientid"});
  relationptdoc.belongsTo(patientinfo, { as: "pat", foreignKey: "patid"});
  patientinfo.hasMany(relationptdoc, { as: "relationptdocs", foreignKey: "patid"});
  bill.belongsTo(roomno, { as: "roomno_roomno", foreignKey: "roomno"});
  roomno.hasMany(bill, { as: "bills", foreignKey: "roomno"});
  roomtypewardtype.belongsTo(roomtypes, { as: "roomtype1_roomtype", foreignKey: "roomtype1"});
  roomtypes.hasMany(roomtypewardtype, { as: "roomtypewardtypes", foreignKey: "roomtype1"});
  patientinfo.belongsTo(roomtypewardtype, { as: "wardtype", foreignKey: "wardtypeid"});
  roomtypewardtype.hasMany(patientinfo, { as: "patientinfos", foreignKey: "wardtypeid"});
  roomno.belongsTo(roomtypewardtype, { as: "idwr1_roomtypewardtype", foreignKey: "idwr1"});
  roomtypewardtype.hasMany(roomno, { as: "roomnos", foreignKey: "idwr1"});
  nurseinfo.belongsTo(wardtypes, { as: "wardinfo_wardtype", foreignKey: "wardinfo"});
  wardtypes.hasMany(nurseinfo, { as: "nurseinfos", foreignKey: "wardinfo"});
  roomtypewardtype.belongsTo(wardtypes, { as: "wardtype1_wardtype", foreignKey: "wardtype1"});
  wardtypes.hasMany(roomtypewardtype, { as: "roomtypewardtypes", foreignKey: "wardtype1"});
  wardboyinfo.belongsTo(wardtypes, { as: "wardinfo_wardtype", foreignKey: "wardinfo"});
  wardtypes.hasMany(wardboyinfo, { as: "wardboyinfos", foreignKey: "wardinfo"});

  return {
    bill,
    cantineinfo,
    doctorinfo,
    nurseinfo,
    patientinfo,
    relationptdoc,
    roomno,
    roomtypes,
    roomtypewardtype,
    wardboyinfo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
