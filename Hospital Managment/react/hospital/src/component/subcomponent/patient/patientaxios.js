import axios from 'axios';
class Patientaxios {

    getmed(ptid){
        console.log(`axiossss${ptid}`);
            let response = axios.get(`http://localhost:9082/api/patmed/${ptid}`);
            console.log(`mmmmmmmmmmmmm${response}`)
            return response;
    }


postbilldata(Patient){
        let response=axios.post(`http://localhost:9082/api/billpost`,Patient);
        return response;
    
}

getdoccharge(dname){
    console.log(`axiossss${dname}`);
        let response = axios.get(`http://localhost:9082/api/billdoctorDetails/${dname}`);
        // console.log(`testttttttttttttttttttt${response}`)
        return response;
}

getroomcharge(idwr){
    console.log(`axiossss${idwr}`);
        let response = axios.get(`http://localhost:9082/api/feesroomwardDetails/${idwr}`);
        // console.log(`testttttttttttttttttttt${response}`)
        return response;
}

getmypatient(dname){
    console.log(`axiossss${dname}`);
        let response = axios.get(`http://localhost:9082/api/mypatientDetails/${dname}`);
        return response;
        // console.log(`resssponseeee ${response}`);
    }

dischargeapt(dis){
    let response=axios.post(`http://localhost:9082/api/dischargedetail`,dis);
    return response;
}

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

discharged(token){
    let response = axios.get('http://localhost:9082/api/dischargedetail/',{
        headers:{
            'AUTHORIZATION': `Bearer ${token}`
        }
    });
    return response;
}

}
export default Patientaxios;