import React, { Component } from "react";
import Users from "./useraxios";
import { Navbar } from "react-bootstrap";
class Updateuserr extends Component {
  constructor(props) {
    super(props);
    this.obj = props.location.state;
    this.state = {
        User_Id: this.obj['UserId'],
        User_name:this.obj['UserName'],
        User_Type:this.obj['desgination'],
        Password: this.obj['Password'],
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Users();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);
  };
submit = () => {
  var user = {
    UserId:this.state.User_Id,
    UserName: this.state.User_name,
    desgination: this.state.User_Type,
    Password: this.state.Password,
  };
  console.log(user);
  this.serv.registerUser(user)
    .then((resp) => {
        console.log(resp)
      this.setState({ message: `Data Updated Successfully` });
      alert("sucess");
      this.props.history.push("/homepage");
    })
    .catch((error) => {
      this.setState({ message: `Error Occured ${error}` });
    });
  };

  render() {
    return (
      <>
      <div align='right'>
       <Navbar style={{background:'black',width:1089 ,height:60}}>
       </Navbar>
      <div  style={{width:1089} } >
        <form style={{width:1089}}>
        <div >
        <h3 align='center'>Update User Data  </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">User Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder='User_Id'  
               name='User_Id'
               value={this.state.User_Id}
               
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>User name</label>
               <input type='text' class="col-sm-9" 
               placeholder='User_name' 
               name='User_name'
               defaultValue={this.state.User_name}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>User Type</label>
               <select class="col-sm-9"
               name='User_Type'
                onChange={this.handleAllChanges.bind(this)}
                value={this.state.User_Type}
                >
                 <option value="Select">Select</option>
                 <option value="Admin">Admin</option>
                 <option value="Doctor">Doctor</option>
                 <option value="Nurse">Nurse</option>
               </select>
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Password</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Password' 
                 name='Password'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.state.Password}
                 />
               </div><br/>
               <div align='center'>
               <input type="button" value="Submit"  className="btn btn-primary" onClick={this.submit.bind(this)}/><br/>
               </div>
              </div>  
          </form>
      </div>
      </div>
      </>

    );
  }
}
export default Updateuserr;

