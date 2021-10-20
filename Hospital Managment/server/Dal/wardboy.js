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
const WardboyModel = require(path.join(__dirname, "../models/wardboyinfo"))(
    sequelize, Sequelize.DataTypes
);

class WardboyDataAccess {
    //Get docient details
    async getwardboyinfo(req, resp) {
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
        let rows = await WardboyModel.findAll();
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
    async postwardboyinfo(req, resp) {
        const war = req.body;
        console.log(`wardboy added ${war}`);
        await sequelize.sync({ force: false });
        let rec = WardboyModel.create(war);
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
    async putwardboyinfo(req, resp) {
        const id = parseInt(req.params.wbid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => WardboyModel.update({
                wbname: pro.wbname,
                wbmobileno: pro.wbmobileno,
                wbaddress: pro.wbaddress,
                wbcity: pro.wbcity,
                wbemail: pro.wbemail,
                wardinfo: pro.wardinfo
            }, {
                where: { wbid: id }
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
    async delwardboy(req, resp) {
        const id = parseInt(req.params.wbid);
        await sequelize
            .sync({ force: false })
            .then(() => WardboyModel.destroy({
                where: { wbid: id }
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

module.exports = WardboyDataAccess;




