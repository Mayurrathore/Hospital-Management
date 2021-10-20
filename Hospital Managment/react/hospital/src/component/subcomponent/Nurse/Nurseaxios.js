import axios from "axios";

class Nurseaxiosss{

//Get nurse Data

getnurse(token){
let response=axios.get(`http://localhost:9082/api/nurseDetails/`,{
    headers:{
        'AUTHORIZATION': `Bearer ${token}`
    }
});
return response;
}
//Delete nurse info
deletenurse(nid){
    console.log(nid)
    let response=axios.delete(`http://localhost:9082/api/nurseDetails/${nid}`)
    return response;
}
//Add new nurse 
postnurseinfo(Nurse){
    let response=axios.post(`http://localhost:9082/api/nurseDetails`,Nurse)
    return response;
    
}
putnurseinfo(Nurse_Id,Nurse){
    let response=axios.put(`http://localhost:9082/api/nurseDetails/${Nurse_Id}`,Nurse)
    return response;
    
}
}

export default Nurseaxiosss;
