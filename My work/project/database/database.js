const {Sequelize , DataTypes} =require("sequelize")
 const sequelize = new Sequelize('hospital','root','Mayur@123',{
    host :'localhost',
    dialect :'mysql',
    pool :{
        max :5,
        min:5,
        idle:1000
    }
});
sequelize.authenticate();
try {
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }