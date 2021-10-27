const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };

const sequelize = new Sequelize("hospital", "root", "Mayur@123", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
    },
    define: {
        timestamps: false,
    },
});
const DoctorModel = require(path.join(__dirname, "../models/doctorinfo"))(
    sequelize, Sequelize.DataTypes
);

class DoctorDataAccess {
    //Get docient details

    async getdoctorinfo(req, resp) {
        if (req.headers.authorization !== undefined) {
                  let receivedToken = req.headers.authorization.split(" ")[1];
                  await jwt.verify(
                    receivedToken,
                    jwtSettings.jwtSecret,
                    async (error, decode) => {
                      if (error)
                        return resp.status(401).send({
                          response: `AUthorization failed`,
                        });
                      req.decode = decode;
        await sequelize.sync({ force: false });
        let rows = await DoctorModel.findAll();
        return resp.status(200).send({message: rows});   
}
);
}
else {
    return resp.status(401).send({
      response: `AUthorization failed, no AUTHORIZATION header present in the request`,
    });
}
 }
//
async billcharges(req, resp) {
    const id = req.params.dname;
    console.log(`dnameeeeeee${id}`)
        await sequelize.sync({ force: false });
        let rows = await DoctorModel.findOne({ where: { dname: id } });
        console.log(`fesssss:-${rows.dataValues['dfeespervisit']}`)
        return resp.status(200).send({ message: rows.dataValues['dfeespervisit'] });
       
   
}

    ///Post docient details
    async postdoctorinfo(req, resp) {
        const doc = req.body;
        console.log(`doctor added ${doc}`);
        await sequelize.sync({ force: false });
        let rec = DoctorModel.create(doc);
        if (rec) {
            return resp.status(200).send({
                message: "Data is Added Successfully",
                rows: rec,
            });
        }
        return resp
            .status(500)
    }
    ///put docient details
    async putdocientinfo(req, resp) {
        const id = parseInt(req.params.did);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => DoctorModel.update({
                dname: pro.dname,
                daddress: pro.daddress,
                city: pro.city,
                dage: pro.dage,
                ptgender: pro.ptgender,
                dgender: pro.dgender,
                dspecalization: pro.dspecalization,
                dmobileno: pro.dmobileno,
                dfeespervisit: pro.dfeespervisit

            }, {
                where: { did: id }
            }))
            .then((data) => {
                resp.status(200).send({
                    message: "Data is Updated Successfully",
                    rows: data
                });
            })
            .catch((error) => {
                resp
                    .status(500)
                    .send({ message: "Some Error Occured", errorDetails: error.message });
            });


    }
    async deldoctor(req, resp) {
        const id = parseInt(req.params.did);
        await sequelize
            .sync({ force: false })
            .then(() => DoctorModel.destroy({
                where: { did: id }
            }))
            .then((data) => {
                resp.status(200).send({
                    message: "Data is Deleted Successfully",
                    rows: data,
                });
            })
            .catch((error) => {
                resp
                    .status(500)
                    .send({ message: "Some Error Occured", errorDetails: error.message });
            });

    }
}

module.exports = DoctorDataAccess;



















