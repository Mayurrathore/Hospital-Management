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
            designation:""
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
handleDelete = (c) => {
    let ptid = parseInt(c.target.value)
    console.log(`pattttttttt${ptid}`)
    console.log(typeof(ptid));
    this.serv.deletePatient(ptid).then((resp) => {
      this.setState({ message: resp.data.message });
          this.getValues();
        })
      .catch((error) => {
          this.setState({ message: `Error Occured ${error.message}` });
      });
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
          <ul> <NavLink link to onClick={this.getValues.bind(this)}  ClassName='active'>Patient Details</NavLink></ul>
        {
          this.state.designation == 'Admin'?
          <ul> <NavLink link to='/patient/Addpatient' ClassName='active'>Add Patient</NavLink></ul> 
          
          :null
          }
          </Navbar>
          
          </div>
        
            <br/>
        <div align="right">
        <table style={{width:1089}}  className="table table-bordered table table-hover">
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
             
               <td>
                   <button className="btn btn-dark" onClick={()=>this.handleupdate(doc)} value={doc}>Update</button>
                </td>
                 {
                  this.state.designation == 'Admin'?
                  <>
                <td>
                    <button className="btn btn-dark" onClick={this.handleDelete.bind(this)} value={doc.ptid}>Delete</button>
                </td></>:null
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