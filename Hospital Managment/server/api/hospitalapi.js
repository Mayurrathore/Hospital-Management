const express = require("express");
const cors = require("cors");
const DoctorDataAccess =require('./../Dal/doctor')
const PatientDataAccess  =require('./../Dal/patient')
const NurseDataAccess =require('./../Dal/nurse')
const WardboyDataAccess =require('./../Dal/wardboy')
const MedicineDataAccess=require('./../Dal/medicine')
const WardtypeDataAccess=require('./../Dal/wardtype')
const RoomtypeDataAccess =require('./../Dal/roomtype')
const RoomWardDataAccess=require('./../Dal/roomward')
const CantineDataAccess=require('./../Dal/cantine')
const Authlogin=require('./../Dal/tokenlogic')
const AuthLogic=require('./../Dal/user')

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

const middleware=(req,resp,next)=>{
  console.log("middleware ");
  next(); 
}

let login =new Authlogin();
instance.post('/api/app/login', login.authUser);

let auth =new AuthLogic();

////
instance.post('/api/app/register', auth.registerUser);
instance.get('/api/app/auth',auth.getuserdata)
instance.delete('/api/app/delete/:UserId',auth.deluser)

//patient
let objpat =new PatientDataAccess();
instance.get("/api/patientDetails/", objpat.getpatientinfo);
instance.post("/api/patientDetails/", objpat.postpatientinfo);
instance.put('/api/patientDetails/:ptid', objpat.putpatientinfo);
instance.delete('/api/patientDetails/:ptid', objpat.delpatient);
instance.get('/api/patientDetails/:ptid',objpat.getpatientbyid);

//Doctor
let objdoc =new DoctorDataAccess();
instance.get("/api/doctorDetails/", objdoc.getdoctorinfo);
instance.post("/api/doctorDetails/", objdoc.postdoctorinfo);
instance.put('/api/doctorDetails/:did', objdoc.putdocientinfo);
instance.delete('/api/doctorDetails/:did', objdoc.deldoctor);

//Nurse
let objnur =new NurseDataAccess();
instance.get("/api/nurseDetails/", objnur.getnurseinfo);
instance.post("/api/nurseDetails/", objnur.postnurseinfo);
instance.put('/api/nurseDetails/:nid', objnur.putnurseinfo);
instance.delete('/api/nurseDetails/:nid', objnur.delnurse);

//wardboy

let objwar =new WardboyDataAccess();
instance.get("/api/wardboyDetails/", objwar.getwardboyinfo);
instance.post("/api/wardboyDetails/", objwar.postwardboyinfo);
instance.put('/api/wardboyDetails/:wbid', objwar.putwardboyinfo);
instance.delete('/api/wardboyDetails/:wbid', objwar.delwardboy);

//Medicine

let objmed =new MedicineDataAccess();
instance.get("/api/medicineDetails/", objmed.getmedicineinfo);
instance.post("/api/medicineDetails/", objmed.postmedicineinfo);
instance.put('/api/medicineDetails/:medicineid', objmed.putmedicineinfo);
instance.delete('/api/medicineDetails/:medicineid', objmed.delmedicine);

//wardtypes
let objwaty =new WardtypeDataAccess();
instance.get("/api/wardtypeDetails/", objwaty.getwardtypeinfo);
instance.post("/api/wardtypeDetails/", objwaty.postwardtypeinfo);
instance.put('/api/wardtypeDetails/:wardtype', objwaty.putwardtypeinfo);
instance.delete('/api/wardtypeDetails/:wardtype', objwaty.delwardtype);

//roomtype
let objroty =new RoomtypeDataAccess();
instance.get("/api/roomtypeDetails/", objroty.getroomtypeinfo);
instance.post("/api/roomtypeDetails/", objroty.postroomtypeinfo);
instance.put('/api/roomtypeDetails/:roomtype', objroty.putroomtypeinfo);
instance.delete('/api/roomtypeDetails/:roomtype', objroty.delroomtype);

//roomward
let objrowr =new RoomWardDataAccess();
instance.get("/api/roomwardDetails/", objrowr.getroomwardinfo);
instance.post("/api/roomwardDetails/", objrowr.postroomwardinfo);
instance.put('/api/roomwardDetails/:idwr', objrowr.putroomwardinfo);
instance.delete('/api/roomwardDetails/:idwr', objrowr.delroomward);

//cantine
let objcan =new CantineDataAccess();
instance.get("/api/cantineDetails/", objcan.getcantineinfo);
instance.post("/api/cantineDetails/", objcan.postcantineinfo);
instance.put('/api/cantineDetails/:foodid', objcan.putcantineinfo);
instance.delete('/api/cantineDetails/:foodid', objcan.delcantine);


instance.listen(9082, () => {
    console.log("REST APIs are on port 9082");
  });




