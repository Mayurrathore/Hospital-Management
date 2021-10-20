import axios from 'axios';
class Cantinee{

getcantinedata(token){
        let response = axios.get('http://localhost:9082/api/cantineDetails/',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
}



postfood(Food){
    let response =axios.post (`http://localhost:9082/api/cantineDetails`,Food);
    return response;
}



deletecantinedata(foodid)
{
    let response =axios.delete(`http://localhost:9082/api/cantineDetails/${foodid}`)
    return response;
}

putfood(Food_Id,Food)
{
    let response =axios.put(`http://localhost:9082/api/cantineDetails/${Food_Id}`,Food)
    return response;
}

}
export default Cantinee;