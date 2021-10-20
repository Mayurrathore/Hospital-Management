const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const { log } = require("util");
const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };
    
const sequelize = new Sequelize("hospital", "root", "Mayur@123", {
    host: "localhost",
    dialect: "mysql",
});

const usersModel = require(path.join(__dirname, "../models/users.js"))(
    sequelize,
    Sequelize.DataTypes
  );

  class Authlogin {
    
    async authUser(req, resp) {
      let user = req.body;

      let data = await usersModel.findOne({ where: { UserName: user.UserName } });
        console.log(`this is a  dststst ${JSON.stringify(data)}`);
      let usr={UserName:data['UserName'],desgination:data['desgination']}
      console.log(`this is usrrrrrrrrrr ${JSON.stringify(usr)}`);
      if (usr === null) {
        return resp.status(404).send({
          message: `User Name ${user.UserName} not found please register`,
        });
      }
      if (data.Password.trim() !== user.Password.trim()) {
        return resp
          .status(401)
          .send({ message: `User Name ${user.UserName}Password does not match` });
      }
      const token = jwt.sign({ usr }, jwtSettings.jwtSecret, {
        expiresIn: 3600
      });
      return resp.status(200).send({
        message: "data",
        token: {token : token , desi : data['desgination'] ,user:data['UserName']},
      });
    }
  }

module.exports = Authlogin;