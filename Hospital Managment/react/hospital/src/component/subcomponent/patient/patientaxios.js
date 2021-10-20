import axios from 'axios';
class Patientaxios {

postpatientinfo(Patient){
    let response = axios.post(`http://localhost:9082/api/patientDetails`,Patient);
        return response;
    }


getpatient(token){
        let response = axios.get('http://localhost:9082/api/patientDetails/',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

deletePatient(ptid){
    console.log(`patttttientiidddd${typeof(ptid)}`)
    let response =axios.delete(`http://localhost:9082/api/patientDetails/${ptid}`)
    return response;
}

putpatient(Patient_Id,Patient)
{
    let response=axios.put(`http://localhost:9082/api/patientDetails/${Patient_Id}`,Patient)
    return response;
}

}
export default Patientaxios;