const express = require("express")
const app =express()
require('./database')

app.get("/",(req,res)=>{

    res.send("from app side")

});

app.listen(3000,()=>{
    console.log("app started at port 3000")

});
