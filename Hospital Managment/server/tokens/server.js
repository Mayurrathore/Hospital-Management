const express  = require('express');
const cors = require('cors');
const authLogic = require('./dal/tokenlogic');
const instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());

instance.use(
  cors({
    origin: "*",
    allowedHeaders: "*", 
    methods: "*", 
  })
);
const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
  };
instance.set("jwtSecret", jwtSettings.jwtSecret);


let auth = new authLogic();

instance.post('/api/app/register', auth.registerUser);
instance.post('/api/app/auth', auth.authUser);
instance.get('/api/app/get', auth.getData);

instance.listen(8010,()=>{
    console.log('Server Started on port 8010');
});