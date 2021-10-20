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
const NurseModel = require(path.join(__dirname, "../models/nurseinfo"))(
    sequelize, Sequelize.DataTypes
);

class NurseDataAccess {
    //Get docient details
    async getnurseinfo(req, resp) {
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
                    let rows = await NurseModel.findAll();
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
    async postnurseinfo(req, resp) {
        const nur = req.body;
        console.log(`Nurse added ${nur}`);
        await sequelize.sync({ force: false });
        let rec = NurseModel.create(nur);
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
    async putnurseinfo(req, resp) {
        const id = parseInt(req.params.nid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => NurseModel.update({
                nname: pro.nname,
                nmobileno: pro.nmobileno,
                naddress: pro.naddress,
                ncity: pro.ncity,
                nemail: pro.nemail,
                wardinfo: pro.wardinfo
            }, {
                where: { nid: id }
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
    async delnurse(req, resp) {
        const id = parseInt(req.params.nid);
        await sequelize
            .sync({ force: false })
            .then(() => NurseModel.destroy({
                where: { nid: id }
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

module.exports = NurseDataAccess;




