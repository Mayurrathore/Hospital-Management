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
const MedicineModel = require(path.join(__dirname, "../models/medicineinfo"))(
    sequelize, Sequelize.DataTypes
);

class MedicineDataAccess {
    //Get docient details
    async getmedicineinfo(req, resp) {
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
        let rows = await MedicineModel.findAll();
        return resp.status(200).send({rows});
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
    async postmedicineinfo(req, resp) {
        const med = req.body;
        console.log(`Nurse added ${med}`);
        await sequelize.sync({ force: false });
        let rec = MedicineModel.create(med);
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
    async putmedicineinfo(req, resp) {
        const id = parseInt(req.params.medicineid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => MedicineModel.update({
                name: pro.name,
                medicinetype: pro.medicinetype,
                manufacturedate: pro.manufacturedate,
                expirydate: pro.expirydate,
                neinwarddatemail: pro.inwarddate,
                price: pro.price
            }, {
                where: { medicineid: id }
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
    async delmedicine(req, resp) {
        const id = parseInt(req.params.medicineid);
        await sequelize
            .sync({ force: false })
            .then(() => MedicineModel.destroy({
                where: { medicineid: id }
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

module.exports = MedicineDataAccess;




