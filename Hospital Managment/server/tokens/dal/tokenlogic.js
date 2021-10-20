const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const jwtSettings = {
  jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};

const sequelize = new Sequelize("hospital", "root", "Mayur@123", {
  host: "localhost",
  dialect: "mysql",
});

// const deptModel = require(path.join(__dirname, "./../models/department"))(
//   sequelize,
//   Sequelize.DataTypes
// );

const usersModel = require(path.join(__dirname, "./../../models/users"))(
  sequelize,
  Sequelize.DataTypes
);

class AuthLogic {
  async registerUser(req, resp) {
    let user = req.body;
    await sequelize.sync({ force: false });
    let usr = await usersModel.findOne({ where: { UserName: user.UserName } });
    if (usr !== null) {
      return resp
        .status(409)
        .send({ message: `User Name ${user.UserName} already exists` });
    }
    let created = await usersModel.create(user);
    return resp
      .status(201)
      .send({ message: `User Name ${user.UserName} CReated` });
  }
  async authUser(req, resp) {
    // Logic for authenticating user
    let user = req.body;
    // check if the user exist
    let usr = await usersModel.findOne({ where: { UserName: user.UserName } });
    if (usr === null) {
      return resp.status(404).send({
        message: `User Name ${user.UserName} not found please register`,
      });
    }
    // match the password
    if (usr.PAssword.trim() !== user.PAssword.trim()) {
      return resp
        .status(401)
        .send({ message: `User Name ${user.UserName}Password does not match` });
    }

    // authorize the user using JWT Security Context and generate the token for it
    // Parameter 1: Payload:, the CReadential Information that is to be added in Token for Identity
    // Parameter 2: secretOrPrivateKey: The Signeture
    // Parameter 3: options:SignOptions, the parameters to set Algorithm, Expiry, etc.
    const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
      expiresIn: 3600 // 1 hour
    });

    return resp.status(200).send({
      message: `User Name ${user.UserName}is Authencated`,
      token: token,
    });
  }
  async getData(req, resp) {
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
          let data = await deptModel.findAll();
          return resp.status(200).send({ message: data });
        }
      );    
    } else {
      return resp.status(401).send({
        response: `AUthorization failed, no AUTHORIZATION header present in the request`,
      });
    }
  }
}

module.exports = AuthLogic;