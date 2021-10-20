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
const CantineModel = require(path.join(__dirname, "../models/cantineinfo"))(
    sequelize, Sequelize.DataTypes
);

class CantineDataAccess {
    async getcantineinfo(req, resp) {
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
        let rows = await CantineModel.findAll();
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
    async postcantineinfo(req, resp) {
        const cn = req.body;
        console.log(`roomward added ${cn}`);
        await sequelize.sync({ force: false });
        let rec = CantineModel.create(cn);
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
    async putcantineinfo(req, resp) {
        const id = parseInt(req.params.foodid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => CantineModel.update({
                foodname: pro.foodname,
                foodquantity: pro.foodquantity,
                foodtype: pro.foodtype,
                price: pro.price


            }, {
                where: { foodid: id }
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
    async delcantine(req, resp) {
        const id = parseInt(req.params.foodid);
        await sequelize
            .sync({ force: false })
            .then(() => CantineModel.destroy({
                where: { foodid: id }
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

module.exports = CantineDataAccess;



