import React ,{ Component } from "react";
import {Route,Redirect,Link,Switch,NavLink} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Doctoraxios from "./Doctoraxios";
import image from "../image/patient.png"
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            departments: [],
            columnHeaders:[], 
            designation:""
          }  
          this.serv = new Doctoraxios();
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
        pathname : "/doctor/updatedoctor",
        state : c
      })
          }
handleDelete = (c) => {
        let did = parseInt(c.target.value)
        console.log(`pattttttttt${did}`)
        console.log(typeof(did));
        this.serv.deletedoctor(did).then((resp) => {
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
          this.serv.getdoctor(token)
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
          <ul><NavLink link to onClick={this.getValues.bind(this)}  ClassName='active'>Doctor Details</NavLink></ul>
          {
          this.state.designation == 'Admin'?
          <ul> <NavLink link to='/doctor/Adddoctor' ClassName='active'>Add Doctor</NavLink></ul> 
          :null
          }
          </Navbar>
          </div>
          <br/>
          <div align="right"> 
        <table  style={{width:1080}} className="table table-bordered table table-hover">
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
                    <button className="btn btn-dark" onClick={this.handleDelete.bind(this)} value={doc.did}>Delete</button>
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
export default Doctor;