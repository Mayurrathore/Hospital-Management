import React ,{ Component } from "react";
import {Route,Redirect,Link,Switch,NavLink} from "react-router-dom";
import  SecureCallService from "./patientaxios"
import axios from 'axios';
import image from "../image/patient.png"
import { Navbar } from "react-bootstrap";
class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            departments: [],
            columnHeaders:[] ,
            designation:"",
            message1:"",
            departments1:[],
            columnHeaders1:[]
           
          } ; 
          this.serv = new SecureCallService();
    }
componentDidMount(prevProp)
  {
        let token=sessionStorage.getItem('token')
        let designation = sessionStorage.getItem('Designation')
        console.log(designation);
        if(token==null || designation==null)
        {
            this.props.history.push('/');
        }
        this.setState({designation  :designation})

  }
handleupdate(c){
  console.log(c)
  this.props.history.push({
    pathname : "/patient/updatepatient",
    state : c
  })
      }
      handlebill(c){
        console.log(c)
        this.props.history.push({
          pathname : "/patient/bill",
          state : c
        })
            }

handlemedi(c){
  console.log(c)
        this.props.history.push({
          pathname : "/patient/medi",
          state : c
        })
            
}
  
handleDelete = (c) => {
  let dis=c
  console.log(`disssdatav ${JSON.stringify(dis)}`)
  this.serv.dischargeapt(dis).then((resp)=>{
    this.setState({message:resp.data.message});
  }).catch((error)=>{
      this.setState({message:`Error occured ${error.message}`})
  })
   
  let ptid = parseInt(c.ptid)
    console.log(`pattttttttt${JSON.stringify(ptid)}`)
    console.log(typeof(ptid));
    this.serv.deletePatient(ptid).then((resp) => {
      this.setState({ message: resp.data.message });
          // this.getValues();
          // this.getdischarge();
          this.getmypatient();
        })
      .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
      });
  
    
  }

  //get my patient

  getmypatient() {
    let dname = sessionStorage.getItem("User");
    console.log(`nameeeee${dname}`);
      this.serv.getmypatient(dname)
        .then((resp) => {
          console.log(`respppp${JSON.stringify(resp)}`)
          this.setState({ departments: resp.data.message });
          this.setState({ message: `Data Received Successfully` });
          this.setState({columnHeaders:Object.keys(this.state.departments[0])})
        })
        .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
        });
    
  }

//get discharge patient 
  getdischarge() {
    let token = sessionStorage.getItem("token");
    if (token === undefined) {
      this.setState({ message1: `Please send the Auth Header` });
    } else {
      this.serv.discharged(token)
        .then((resp) => {
          this.setState({ departments1: resp.data.message });
          this.setState({ message1: `Data Received Successfully` });
          this.setState({columnHeaders1:Object.keys(this.state.departments1[0])})
        })
        .catch((error) => {
          this.setState({ message1: `Error Occured ${error.message}` });
        });
    }
  }


getValues() {
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
          this.setState({ message: `Please send the Auth Header` });
        } else {
          this.serv.getpatient(token)
            .then((resp) => {
              this.setState({ departments: resp.data.message });
              this.setState({ message: `Data Received Successfully` });
              this.setState({columnHeaders:Object.keys(this.state.departments[0])})
            })
            .catch((error) => {
              this.setState({ message: `Error Occured ${error.message}` });
            });
        }
      }


    render() { 
        return ( 
          <>
            <div class="bg_image" style={{ backgroundImage: 'url('+image+')',backgroundSize: "cover",height: "150vh",color: "#f5f5f5"}}> 
         <div align="right">
          <Navbar style={{background:'black',width:1089 ,height:60}} >
         
        {
          this.state.designation == 'Admin'?
         <> 
         <ul> <NavLink link to onClick={this.getValues.bind(this)}  ClassName='active'>Patient Details</NavLink></ul>
         <ul> <NavLink link to='/patient/Addpatient' ClassName='active'>Add Patient</NavLink></ul>
         <ul> <NavLink link to onClick={this.getdischarge.bind(this)}  ClassName='active'>Discharged Patient</NavLink></ul>
           </>
          
          :
          this.state.designation == 'Doctor'?
          <>
          <ul> <NavLink link to onClick={this.getmypatient.bind(this)}  ClassName='active'>Show My Patient</NavLink></ul>
          {/* <ul> <NavLink link to onClick={this.getdischarge.bind(this)}  ClassName='active'>Discharged Patient</NavLink></ul> */}
          </>
          : this.state.designation == 'Account'?
          <>
          <ul> <NavLink link to onClick={this.getdischarge.bind(this)}  ClassName='active'>Discharged Patient</NavLink></ul>
          </>:null
          }
          </Navbar>
          
          </div>
        
            <br/>
        <div align="right">
        <table style={{width:1089 ,margin:"left"}}  className="table table-bordered table table-hover">
          <thead>
            <tr>
              {this.state.columnHeaders.map((head, idx) => (
                <th key={idx}>{head}</th> 
              ))}
              
            </tr>
          </thead>
          <tbody>
            {this.state.departments.map((doc, idx) => (
              <tr key={idx}>
                {this.state.columnHeaders.map((head, i) => (
                  <td key={i}>{doc[head]}</td>
                ))}
                 {
                  this.state.designation == 'Admin'?
                  <>
                  <td>
                   <button className="btn btn-dark" onClick={()=>this.handleupdate(doc)} value={doc}>Update</button>
                </td>
                <td>
                    <button className="btn btn-dark" 
                    onClick={()=>this.handleDelete(doc)} value={doc}>Delete</button>
                </td></>
                : this.state.designation == 'Doctor' ?
                <>
                <td>
                <button className="btn btn-dark" 
                    onClick={()=>this.handleDelete(doc)} value={doc}>Discharge</button>
                </td>
                <td>
                <button className="btn btn-dark" 
                    onClick={()=>this.handlemedi(doc)} value={doc}>Medicine</button>
                </td>


                </>:null
             }
              </tr>
            ))}
          </tbody>
        </table>
            </div>

////for discharge
            <div align="right">
           
        <table style={{width:1089}}  className="table table-bordered table table-hover">
      
          <thead >
            <tr>
              {this.state.columnHeaders1.map((head, idx) => (
                <th key={idx}>{head}</th> 
              ))}
              
            </tr>
          </thead>
          <tbody>
            {this.state.departments1.map((doc, idx) => (
              <tr key={idx}>
                {this.state.columnHeaders1.map((head, i) => (
                  <td key={i}>{doc[head]}</td>
                ))}

                    {
                      this.state.designation == "Account"?
                      <>
                      <td>
                <button className="btn btn-dark" 
                    onClick={()=>this.handlebill(doc)} value={doc}>Bill</button>
                </td>
                      </>:null
                    }


              </tr>
            ))}
          </tbody>
        </table>
            </div>
            </div>
            </>
         );
    }
}
export default Patient;