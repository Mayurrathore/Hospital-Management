const express = require('express')
data = [
    {ProductId : '101',ProductName:'Earphone',ManufacturerName:"oneplus",CatrgoryName:"Electronic",price:1000},
    {ProductId : '102',ProductName:'Car',ManufacturerName:"Tata",CatrgoryName:"Automobile",price:100000},
    {ProductId : '103',ProductName:'phone',ManufacturerName:"oneplus",CatrgoryName:"Electronic",price:30000},
    {ProductId : '104',ProductName:'Pizza',ManufacturerName:"pizza Hut ",CatrgoryName:"Food",price:500},
    {ProductId : '105',ProductName:'pan-drive',ManufacturerName:"samsung",CatrgoryName:"Electronic",price:1000}
]

const app = express()
app.get('/',(req,res)=>{
    res.json(data)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/',(req,res)=>{
    data.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            res.send("Product Id already in use.");
        }
    })
    data.push({ProductId : req.body.ProductId , ProductName : req.body.ProductName,CatrgoryName: req.body.CatrgoryName,ManufacturerName:req.body.ManufacturerName,price:req.body.price});
    res.send(`Data added at Id:- ${req.body.ProductId}`);
})

app.put('/',(req, res)=> {
    data.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            element.ProductId = req.body.ProductId;
            element.ProductName = req.body.ProductName;
            element.CatrgoryName=req.body.CatrgoryName;
            element.ManufacturerName=req.body.ManufacturerName;
            element.price=req.body.price
           
            res.send("Data Updated");
        }
    })
    res.send(`The Id :- ${req.body.ProductId} is not available.`);
})

app.delete('/' , (req,res)=>{
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].ProductId == req.body.ProductId)
        {
            data.splice(i,1);
            res.send("Data Deleted");
        }
    }
    res.send("Id not available");
})
app.listen(4000,()=>{
    console.log("listening port 4000")
});