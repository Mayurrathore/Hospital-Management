import React, { Component } from 'react';
import {Route,NavLink, BrowserRouter ,Switch,} from 'react-router-dom'
import './home.css'
import Image from "react-bootstrap/Image";
import footer from './image/hospital.png'
import pan from './image/homepanel.png'
import "bootstrap/dist/css/bootstrap.css";
import Addproduct from './patient/addpatient';
import Patient from './patient/patientmain';
import Doctor from './Doctor/Doctormain';
import Adddoctor from './Doctor/adddoctor';
import Nurse from './Nurse/Nursemain';
import Addnurse from './Nurse/addnurse';
import wardboy from './wardboyinfo/Wardboymain';
import Addwardboy from './wardboyinfo/addwardboy';
import Medicine from './Medicine/Medicinemain';
import Addmedicine from './Medicine/Addmedicine';
import Roomward from './roomwardtype/roomwardmain';
import Addroomward from './roomwardtype/addroomward';
import Cantine from './cantine/cantinemain';
import Addcantine from './cantine/addcantine';
import Imgg from './image/test.png';
import Updateproduct from './patient/updatepatient';
import Updatecantine from './cantine/updatecantine';
import Updatedoctor from './Doctor/updatedoctor';
import Updatenurse from './Nurse/updatenurse';
import Updatewardboy from './wardboyinfo/updatewardboy';
import Updateroomwardss from './roomwardtype/updateroomward';
import Updatemedicine from './Medicine/updatemedicine';
import Authuser from './user/usersmain';
import Adduserr from './user/adduser';
import Updateuserr from './user/Updateuser';
import { Navbar } from 'react-bootstrap';
class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
    designation : "",
    User:""
    }}

handlelogout(){
        sessionStorage.clear();
        this.props.history.push('/');
}
    componentDidMount(prevProp){
        let token=sessionStorage.getItem('token')
        let designation = sessionStorage.getItem('Designation')
        let User =sessionStorage.getItem('User')
        console.log(designation);
        console.log(token);
        if(token==null || designation==null)
        {
            this.props.history.push('/');
        }
        this.setState({designation  :designation})
        this.setState({User:User})
        
    }
  render() {
     
      return (
        <>
     <div class="bg_image" style={{ backgroundImage: 'url('+pan+')',backgroundSize: "cover",height: "150vh",color: "#f5f5f5"}}>
        <BrowserRouter>
        <div className='calculator card'>
        <main class="main">
       
              <aside class="sidebar">
             
                         <NavLink link to='/homepage' className='active'> <img src={Imgg} /></NavLink>   
             <ul >
                      <li>
                        <strong User Name>{this.state.User}</strong>   
                      {
                        this.state.designation == 'Admin' ?
                        <>
                          <NavLink link to ='/user' className='active'>Register <i class="fa fa-user-plus" style={{color:'white',fontSize:25}}></i> </NavLink>
                          <NavLink link to='/patient' ClassName='active'> Patient <i class="fa fa-hospital-user" style={{color:'white',fontSize:25}}></i></NavLink>
                          <NavLink link to='/doctor' ClassName='active'>Doctor <i class="fa fa-user-md" style={{color:'white',fontSize:25}}></i></NavLink>
                          <NavLink link to='/nurse' ClassName='active'>Nurse <i class="fa fa-user-nurse" style={{color:'white',fontSize:25}}></i></NavLink>
                          <NavLink link to='/wardboy' ClassName='active'>Ward Boy <i class="fa fa-male" style={{color:'white',fontSize:25}}></i></NavLink>
                          <NavLink link to='/medicine' ClassName='active'>Medicine <i class="fa fa-clinic-medical" style={{color:'white',fontSize:25}}></i></NavLink>
                          <NavLink link to='/cantine' ClassName='active'>Cantine <i class="fa fa-concierge-bell" style={{color:'white',fontSize:25}}></i> </NavLink>
                          <NavLink link to='/roomward' ClassName='active'>Ward Room<i class="fa fa-bed" style={{color:'white',fontSize:20}}></i></NavLink>
                          </>
                         :
                         this.state.designation == 'Doctor' ? 
                        <>
                        <NavLink link to='/patient' ClassName='active'>Patient <i class="fa fa-hospital-user" style={{color:'white',fontSize:25}}></i></NavLink>
                        <NavLink link to='/nurse' ClassName='active'>Nurse <i class="fa fa-user-nurse" style={{color:'white',fontSize:25}}></i></NavLink>
                        <NavLink link to='/roomward' ClassName='active'>Ward Room <i class="fa fa-male" style={{color:'white',fontSize:25}}></i></NavLink>
                        </>
                         :
                         this.state.designation == 'Nurse' ? 
                        <>
                        <NavLink link to='/patient' ClassName='active'>Patient <i class="fa fa-hospital-user" style={{color:'white',fontSize:25}}></i></NavLink>
                        {/* <NavLink link to='/nurse' ClassName='active'>Nurse <i class="fa fa-user-nurse" style={{color:'white',fontSize:25}}></i></NavLink> */}
                        <NavLink link to='/roomward' ClassName='active'>Ward Room <i class="fa fa-male" style={{color:'white',fontSize:25}}></i></NavLink>
                        </>
                         :
                        null
                      }
                      <NavLink link to='/' ClassName='active' onClick={this.handlelogout.bind(this)}>Logout <i class="fa fa-sign-out-alt" style={{color:'white',fontSize:20}}></i></NavLink>
                      </li>
                  </ul>
                  </aside>  
                  
        </main>
       
        </div>
                  <div>
                      <Switch>
                      
                      <Route exact path ='/roomward/Addroomward' component={Addroomward}/>
                      <Route exact path ='/medicine/Addmedicine' component={Addmedicine}/>
                      <Route exact path ='/Wardboy/Addwardboy' component={Addwardboy}/>
                      <Route exact path='/nurse/Addnurse' component={Addnurse}/>
                      <Route exact path ='/doctor/Adddoctor' component={Adddoctor}/>
                      <Route exact path='/patient/addpatient' component={Addproduct}/>
                      <Route exact path='/patient/updatepatient' component={Updateproduct}/>
                      <Route exact path='/cantine/updatecantine' component={Updatecantine}/>
                          <Route exact path='/patient' component={Patient} />
                          <Route exact path='/doctor' component={Doctor} />
                          <Route exact path='/nurse' component={Nurse} />
                          <Route exact path='/wardboy' component={wardboy}/>
                          <Route exact path='/medicine' component={Medicine}/>
                          <Route exat path='/roomward' component={Roomward}/>
                          <Route exact path ='/cantine' component={Cantine}/>
                          <Route exact path='/cantine/Addcatine' component={Addcantine}/>
                          <Route exact path='/doctor/updatedoctor' component={Updatedoctor}/>
                          <Route exact path='/nurse/updatenurse' component={Updatenurse}/>
                          <Route exact path='/wardboy/updatewardboy' component={Updatewardboy}/>
                          <Route exact path='/roomward/updatroomward' component={Updateroomwardss}/>
                          <Route exact path='/medicine/updatemedicine' component={Updatemedicine}/>
                          <Route exact path='/user' component={Authuser}/>
                          <Route exact path='/user/Adduser' component={Adduserr}/>
                          <Route exact path='/user/updatuser' component={Updateuserr}/>
                       </Switch>

                  </div>
                  

          </BrowserRouter>
        
           </div>
           <div >

           </div> 
                      {/* <div  >
                          <Navbar style={{background:'#FF4838' ,height:60}}>
                                
                          
                          </Navbar>
                      </div> */}
         

          </>
      );
  }
}

export default Home;

