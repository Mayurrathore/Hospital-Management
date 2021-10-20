const express = require("express");
const cors = require("cors");
const dataAccess = require('./dal/dataaccess');

const instance = express();
instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
instance.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
  })
);


instance.get("/", (req, res) => {

  res.sendFile(__dirname +'/views/logintest.html');
});

instance.get("/home1.html", (req, res) => {
  res.sendFile(__dirname +'/views/home1.html');
});

instance.get("/add.html", (req, res) => {
  res.sendFile(__dirname +'/views/add.html');
});

instance.get("/update.html", (req, res) => {
  res.sendFile(__dirname +'/views/update.html');
});

let objDal =new dataAccess();


instance.get("/api/productDetails/", objDal.getProductdetail);
instance.post("/api/productDetails/", objDal.createProduct);
instance.delete('/api/productDetails/:id', objDal.deleteProduct);
instance.put('/api/productDetails/:id', objDal.updateProduct);

instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });














