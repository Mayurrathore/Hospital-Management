import axios from "axios";

class Wardboyaxioss{

//Get nurse Data

getwardboy(token){
let response=axios.get(`http://localhost:9082/api/wardboyDetails`,{
    
    headers:{
        'AUTHORIZATION': `Bearer ${token}`
    }
});
return response;

}
//Delete nurse info
deletewardboy(wbid){
    console.log(wbid)
    let response=axios.delete(`http://localhost:9082/api/wardboyDetails/${wbid}`)
    return response;
}
//Add new nurse 
postwardboy(Wardboy){
    let response=axios.post(`http://localhost:9082/api/wardboyDetails`,Wardboy)
    return response;
    
}
putwardboy(Wardboy_Id,Wardboy){
    let response=axios.put(`http://localhost:9082/api/wardboyDetails/${Wardboy_Id}`,Wardboy)
    return response;
}
}

export default Wardboyaxioss;