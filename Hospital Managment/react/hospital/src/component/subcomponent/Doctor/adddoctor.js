import React, { Component } from "react";
import Doctoraxios from "./Doctoraxios";
import { Navbar } from "react-bootstrap";
class Adddoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Doctor_Id: 0,
      Doctor_Name:"",
      Doctor_Address:"",
      Doctor_City:"",
      Doctor_Age: 0,
      Doctor_Gender:"",
      Doctor_specalization:"",
      Doctor_Mobile_No:"",
      Doctor_fess_per_vist:"",
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Doctoraxios();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value);
  };
submit = () => {
  var Doctor = {
    did:this.state.Doctor_Id,
    dname: this.state.Doctor_Name,
    daddress: this.state.Doctor_Address,
    city: this.state.Doctor_City,
    dage: this.state.Doctor_Age,
    dgender: this.state.Doctor_Gender,
    dspecalization: this.state.Doctor_specalization,
    dmobileno: this.state.Doctor_Mobile_No,
    dfeespervisit: this.state.Doctor_fess_per_vist
  };
  console.log(`doctorrrrrrrrrrr${JSON.stringify(Doctor)}`);
  this.serv.postdoctorinfo(Doctor)
    .then((resp) => {
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
        <h3 align='center'>Register New Doctor </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">Doctor Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder=' Doctor_Id'  
               name=' Doctor_Id'
               defaultValue={this.state.Doctor_Id}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Doctor Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Doctor_Name' 
               name='Doctor_Name'
               onChange={this.handleAllChanges.bind(this)}
               defaultValue={this.state.Doctor_Name}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Doctor Address</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Doctor_Address' 
               name='Doctor_Address'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Doctor_Address}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Doctor City</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Doctor_City' 
               name='Doctor_City'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Doctor_City}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Doctor Age</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Doctor_Age' 
                 name='Doctor_Age'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.props.Doctor_Age}
                 />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Doctor Gender</label>
               <select class="col-sm-9"
               name='Doctor_Gender'
                onChange={this.handleAllChanges.bind(this)}
                value={this.props.Doctor_Gender}
                >
                <option value="Select">Select</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
               </select>
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Specalization</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Doctor_Specalization'
                 name='Doctor_specalization'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Doctor_specalization}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Mobile No</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Patient Disease'
                 name='Doctor_Mobile_No'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Doctor_Mobile_No}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Fess per vist</label>
               <input type='text'
                class="col-sm-9"
                placeholder='Doctor_fess_per_vist'
                name='Doctor_fess_per_vist'
                onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Doctor_fess_per_vist}
                 ></input>
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
export default Adddoctor;

