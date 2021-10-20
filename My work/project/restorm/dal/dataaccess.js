const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Product", "root", "Mayur@123", {
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

const productModel = require(path.join(__dirname, "./../models/productdetails"))(
  sequelize,
  Sequelize.DataTypes
);
class ProductdetailsDataAccess {
    async getProductdetail(req,resp){
        await sequelize.sync({force:false});
        let rows = await productModel
    .findAll();
        if(rows) {
           return resp.status(200).send({
              rows
              });
        }
        return resp
        .status(500) // internal server error
        .send({ message: "Some Error Occured"}); 
    }
    async createProduct(req,resp){
        const prod  = req.body ;
        console.log(`product added ${prod}`);
        await sequelize.sync({ force: false });
        let rec = productModel.create(prod); 
       if(rec){
          return resp.status(200).send({
            message: "Data is Added Successfully",
            rows: rec,
          });
        }
         return resp
            .status(500)  
            .send({ message: "Some Error Occured" }); 
    }

    async deleteProduct(req, resp){
        const id = parseInt(req.params.id);
        await sequelize
        .sync({ force: false })
        .then(() => productModel.destroy({
            where:{product_id:id}
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

    async updateProduct(req, resp){
        const id = parseInt(req.params.id);
        const pro  = req.body;
        
        await sequelize
        .sync({ force: false })
        .then(() => productModel.update({
            product_name: pro.product_name,
            product_category: pro.product_category,
            product_Manufacturing: pro.product_Manufacturing,
            Product_price: pro.Product_price
        },{
            where:{product_id:id}
        }))
        .then((data) => {
          resp.status(200).send({
            message: "Data is Updated Successfully",
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
module.exports = ProductdetailsDataAccess;
  