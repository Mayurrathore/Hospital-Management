import axios from 'axios';
class Roomwards{

getwardroom(token){
        let response = axios.get('http://localhost:9082/api/roomwardDetails/',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
}



postroomward(Roomward){
    let response =axios.post (`http://localhost:9082/api/roomwardDetails`,Roomward);
    return response;
}



deleteroomward(idwr)
{
    let response =axios.delete(`http://localhost:9082/api/roomwardDetails/${idwr}`)
    return response;
}

}
export default Roomwards;