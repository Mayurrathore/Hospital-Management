import React ,{ Component } from "react";
import {Route,Redirect,Link,Switch,NavLink} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import image from "../image/patient.png"
import Users from './useraxios'
class Authuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            departments: [],
            columnHeaders:[] 
          }  
          this.serv = new Users();
    }

handleupdate(c){
      console.log(c)
      this.props.history.push({
        pathname : "/user/updatuser",
        state : c
      })
    }
///Delete Function
handleDelete = (c) => {

        let UserId = parseInt(c.target.value)
        console.log(UserId);
        this.serv.deleteuser(UserId)
        .then((resp) => {
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
          this.serv.getusers(token)
            .then((resp) => {
                console.log(resp)
              this.setState({ departments: resp.data.message});
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
          <ul><NavLink link to onClick={this.getValues.bind(this)}  ClassName='active'>Users Details</NavLink></ul>
          <ul> <NavLink link to='/user/Adduser' ClassName='active'>Add New User</NavLink></ul> 
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
                <td>
                   <button className="btn btn-dark" onClick={()=>this.handleupdate(doc)} value={doc}>Update</button>
                </td>
                <td>
                    <button className="btn btn-dark" onClick={this.handleDelete.bind(this)} value={doc.UserId}>Delete</button>
                </td>
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
export default Authuser;