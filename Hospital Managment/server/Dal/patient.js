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
const PatientModel = require(path.join(__dirname, "../models/patientinfo"))(
    sequelize, Sequelize.DataTypes
);

class PatientDataAccess {

    async gettestpatinfo(req, resp) {
        await sequelize.sync({ force: false });
        let rows = await PatientModel.findAll();
        console.log(typeof(rows));
        return resp.status(200).send({message: rows});  
}
        
        async getpatientinfo(req, resp) {
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
        let rows = await PatientModel.findAll();
        return resp.status(200).send({message: rows});   
}
);
}
else {
    return resp.status(401).send({
      response: `AUthorization failed, no AUTHORIZATION header present in the request`,
    });
}
 }

 async getpatientbyid(req, resp) {
    if (req.headers.authorization !== undefined) {
        const id = parseInt(req.params.ptid);
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
    let rows = await PatientModel.findOne( {where: { ptid: id }});
    return resp.status(200).send({message: rows});   
}
);
}
else {
return resp.status(401).send({
  response: `AUthorization failed, no AUTHORIZATION header present in the request`,
});
}
}

    ///Post patient details
    async postpatientinfo(req, resp) {
        const pat = req.body;
        console.log(`Patient added................................ ${JSON.stringify(pat)}`);
        await sequelize.sync({ force: false });
        let rec = PatientModel.create(pat);
            return resp.status(200).send({
                message: "Data is Added Successfully",
                
            });
    }

    
    ///put patient details
    async putpatientinfo(req, resp) {
        const id = parseInt(req.params.ptid);
        const pro = req.body;

        await sequelize
            .sync({ force: false })
            .then(() => PatientModel.update({
                Ptname: pro.Ptname,
                Paddress: pro.Paddress,
                ptcity: pro.ptcity,
                ptage: pro.ptage,
                ptgender: pro.ptgender,
                ptdob: pro.ptdob,
                ptdisease: pro.ptdisease,
                ptmobileno: pro.ptmobileno,
                pttype: pro.pttype,
                wardtypeid: pro.wardtypeid

            }, {
                where: { ptid: id }
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
    async delpatient(req, resp) {
        const ptid = parseInt(req.params.ptid);
        console.log("The PTID:-...................................... " , ptid);
        await sequelize
            .sync({ force: false })
            .then(() => PatientModel.destroy({
                where: { ptid: ptid }
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

module.exports = PatientDataAccess;





































































