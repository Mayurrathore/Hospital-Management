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
const WardtypeModel = require(path.join(__dirname, "../models/wardtypes"))(
    sequelize, Sequelize.DataTypes
);

class WardtypeDataAccess {
    async getwardtypeinfo(req, resp) {
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
        let rows = await WardtypeModel.findAll();
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
    async postwardtypeinfo(req, resp) {
        const ward = req.body;
        console.log(`wardtype added ${ward}`);
        await sequelize.sync({ force: false });
        let rec = WardtypeModel.create(ward);
        if (rec) {
            return resp.status(200).send({
                message: "Data is Added Successfully",
                rows: rec,
            });
        }
        return resp
            .status(500)
    }
    async putwardtypeinfo(req, resp) {
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => WardtypeModel.update({
                wardtype: pro.wardtype,
                wardid:pro.wardid,
            },{where : {wardtype : req.params.wardtype}} 
            ))
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
    async delwardtype(req, resp) {
        await sequelize
            .sync({ force: false })
            .then(() => WardtypeModel.destroy({
                where: { wardtype: req.params.wardtype }
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

module.exports = WardtypeDataAccess;
