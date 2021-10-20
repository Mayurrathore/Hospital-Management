import axios from 'axios';
class Doctoraxios {
//Gte doctor info
getdoctor(token){
        let response = axios.get('http://localhost:9082/api/doctorDetails',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

//post doctor info

postdoctorinfo(Doctor){
    let response =axios.post (`http://localhost:9082/api/doctorDetails`,Doctor);
    return response;
}
//delete doctorinfo


deletedoctor(did)
{
    let response =axios.delete(`http://localhost:9082/api/doctorDetails/${did}`)
    return response;
}
putdoctor(Doctor_Id,Doctor)
{
    let response =axios.put(`http://localhost:9082/api/doctorDetails/${Doctor_Id}`,Doctor)
    return response;
}
}
export default Doctoraxios;