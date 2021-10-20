import axios from 'axios';
class Users{

getusers(token){
        let response = axios.get('http://localhost:9082/api/app/auth',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
}

registerUser(user)
{
    let response =  axios.post('http://localhost:9082/api/app/register',user);
    return response;
}

deleteuser(UserId)
{
    console.log(`.....${UserId}`);
    let response =axios.delete(`http://localhost:9082/api/app/delete/${UserId}`)
    return response;
}

}
export default Users;