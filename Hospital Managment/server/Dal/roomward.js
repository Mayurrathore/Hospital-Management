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
const RoomwardModel = require(path.join(__dirname, "../models/roomtypewardtype"))(
    sequelize, Sequelize.DataTypes
);

class RoomWardDataAccess {
    async getroomwardinfo(req, resp) {
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
                    let rows = await RoomwardModel.findAll();
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
    async postroomwardinfo(req, resp) {
        const wr = req.body;
        console.log(`roomward added ${wr}`);
        await sequelize.sync({ force: false });
        let rec = RoomwardModel.create(wr);
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
    async putroomwardinfo(req, resp) {
        const id = parseInt(req.params.idwr);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => RoomwardModel.update({
                wardtype1: pro.wardtype1,
                roomtype1: pro.roomtype1,
                roomfeesperday: pro.roomfeesperday

            }, {
                where: { idwr: id }
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
    async delroomward(req, resp) {
        const id = parseInt(req.params.idwr);
        await sequelize
            .sync({ force: false })
            .then(() => RoomwardModel.destroy({
                where: { idwr: id }
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

module.exports = RoomWardDataAccess;



