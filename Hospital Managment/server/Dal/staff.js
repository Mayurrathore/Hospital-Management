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
const StaffModel = require(path.join(__dirname, "../models/staff"))(
    sequelize, Sequelize.DataTypes
);

class StaffDataAccess {
    async getstaffinfo(req, resp) {
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
                    let rows = await StaffModel.findAll();
                    return resp.status(200).send({ message: rows });
                }
            );
        }
        else {
            return resp.status(401).send({
                response: `AUthorization failed, no AUTHORIZATION header present in the request`,
            });
        }
    }

    ///Post docient details
    async poststaffinfo(req, resp) {
        const stf = req.body;
        console.log(`staff added ${stf}`);
        await sequelize.sync({ force: false });
        let rec = StaffModel.create(stf);
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
    async putstaffinfo(req, resp) {
        const id = parseInt(req.params.staffid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => StaffModel.update({
                stafftype: pro.stafftype,
                staffpname: pro.staffpname,
                gender: pro.gender,
                snum: pro.snum,
                sdob: pro.sdob,
                salaray: pro.salaray,
                Designation: pro.Designation,


            }, {
                where: { staffid: id }
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
    async delstaff(req, resp) {
        const id = parseInt(req.params.staffid);
        await sequelize
            .sync({ force: false })
            .then(() => StaffModel.destroy({
                where: { staffid: id }
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

module.exports = StaffDataAccess;