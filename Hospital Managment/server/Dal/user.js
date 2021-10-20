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
const usersModel = require(path.join(__dirname, "../models/users"))(
  sequelize,
  Sequelize.DataTypes
);
class AuthLogic {

  
  async getuserdata(req,resp){
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
              let rows = await usersModel.findAll();
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
  
  
  async deluser(req, resp) {
    await sequelize
        .sync({ force: false })
        .then(() => usersModel.destroy({
            where: { UserId: req.params.UserId }
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

module.exports = AuthLogic;
