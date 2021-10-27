import React ,{ Component } from "react";
import {Route,Redirect,Link,Switch,NavLink} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Medicineaxios from "./Medicineaxios";
import image from "../image/patient.png"
class Medicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            departments: [],
            columnHeaders:[], 
            designation:""
          }  
          this.serv = new Medicineaxios();
    }

    handleupdate(c){
      console.log(c)
      this.props.history.push({
        pathname : "/medicine/updatemedicine",
        state : c
      })
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


///Delete Function
handleDelete = (c) => {

        let medicineid = parseInt(c.target.value)
        console.log(`pattttttttt${medicineid}`)
        console.log(typeof(medicineid));
        this.serv.deletemedicine(medicineid).then((resp) => {
          this.setState({ message: resp.data.message });
          this.getValues();
            })
          .catch((error) => {
              this.setState({ message: `Error Occured ${error.message}` });
          });
      }

      //Get data Function
getValues() {
        let token = sessionStorage.getItem("token");
        if (token === undefined) {
          this.setState({ message: `Please send the Auth Header` });
        } else {
          this.serv.getmedicine(token)
            .then((resp) => {
                console.log(resp)
              this.setState({ departments: resp.data.rows });
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
          <ul><NavLink link to onClick={this.getValues.bind(this)}  ClassName='active'>Medicine Details</NavLink></ul>
          {
            this.state.designation == 'Admin'?
            <>
          <ul> <NavLink link to='/medicine/Addmedicine' ClassName='active'>Add Medicine</NavLink></ul> 
          </>:null
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
                   <button className="btn btn-dark" onClick={()=>this.handleupdate(doc)}  value={doc}>Update</button>
                </td>
                <td>
                    <button className="btn btn-dark" onClick={this.handleDelete.bind(this)} value={doc.medicineid}>Delete</button>
                </td></>
                :null
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
export default Medicine;