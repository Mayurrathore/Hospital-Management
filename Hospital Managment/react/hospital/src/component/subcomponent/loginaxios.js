import axios from 'axios';
class Loginaxios {
authUser(user){
        let response =  axios.post('http://localhost:9082/api/app/login', user, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    
}
export default Loginaxios;