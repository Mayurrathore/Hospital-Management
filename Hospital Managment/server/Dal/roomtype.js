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
const RoomtypeModel = require(path.join(__dirname, "../models/roomtypes"))(
    sequelize, Sequelize.DataTypes
);

class RoomtypeDataAccess {
    async getroomtypeinfo(req, resp) {
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
                    let rows = await RoomtypeModel.findAll();
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
    async postroomtypeinfo(req, resp) {
        const room = req.body;
        console.log(`roomtype added ${room}`);
        await sequelize.sync({ force: false });
        let rec = RoomtypeModel.create(room);
        if (rec) {
            return resp.status(200).send({
                message: "Data is Added Successfully",
                rows: rec,
            });
        }
        return resp
            .status(500)
    }
    async putroomtypeinfo(req, resp) {
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => RoomtypeModel.update({
                roomtype: pro.roomtype,
                Roomid:pro.Roomid
            }, { where: { roomtype: req.params.roomtype } }
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
    async delroomtype(req, resp) {
        await sequelize
            .sync({ force: false })
            .then(() => RoomtypeModel.destroy({
                where: { roomtype: req.params.roomtype }
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

module.exports = RoomtypeDataAccess;
