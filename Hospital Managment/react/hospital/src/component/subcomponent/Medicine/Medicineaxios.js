import axios from 'axios';
class Medicineaxios {
//Gte doctor info
getmedicine(token){
        let response = axios.get('http://localhost:9082/api/medicineDetails',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
}

//post doctor info

postmedicineinfo(Medicine){
    let response =axios.post (`http://localhost:9082/api/medicineDetails`,Medicine);
    return response;
}
//delete doctorinfo


deletemedicine(medicineid)
{
    let response =axios.delete(`http://localhost:9082/api/medicineDetails/${medicineid}`)
    return response;
}


putmedicineinfo(Medicine_Id,Medicine)
{
    let response =axios.put(`http://localhost:9082/api/medicineDetails/${Medicine_Id}`,Medicine)
    console.log("ye response he"+response);
    return response;
}

}
export default Medicineaxios;