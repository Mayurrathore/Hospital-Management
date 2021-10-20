import React, { Component } from "react";
import Patientaxios from "./patientaxios";
import { Navbar } from "react-bootstrap";
class Updateproduct extends Component {
  constructor(props) {
    super(props);
    this.obj = props.location.state;
    this.state = {
      Patient_Id: this.obj['ptid'],
      Patient_Name: this.obj['Ptname'],
      Patient_Address: this.obj['Paddress'],
      Patient_City: this.obj['ptcity'],
      Patient_Age:this.obj['ptage'],
      Patient_Gender: this.obj['ptgender'],
      Date_of_Birth:this.obj['ptdob'],
      Patient_Disease: this.obj['ptdisease'],
      Patient_Mobile_No: this.obj['ptmobileno'],
      Patient_Type: this.obj['pttype'],
      Patient_Ward_ID: this.obj['wardtypeid'],
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Patientaxios();
  }


  handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    // console.log(evt.target.name , evt.target.value);
  };
  save = () => {
  var Patient = {
    ptid:this.state.Patient_Id,
    Ptname: this.state.Patient_Name,
    Paddress: this.state.Patient_Address,
    ptcity: this.state. Patient_City,
    ptage: this.state.Patient_Age,
    ptgender: this.state.Patient_Gender,
    ptdob: this.state.Date_of_Birth,
    ptdisease: this.state.Patient_Disease,
    ptmobileno: this.state.Patient_Mobile_No,
    pttype :this.state.Patient_Type,
    wardtypeid: this.state.Patient_Ward_ID
  };
  this.serv.putpatient(this.state.Patient_Id,Patient)
    .then((resp) => {
      this.setState({ message: `Data Updated Successfully` });
      alert("sucess");
      this.props.history.push("/patient");
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
        <form className='Form-control' style={{width:1089}}>
        <div >
        <h3 align='center'>Register New Patient </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">Patient Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder='Patient Id'  
               name='Patient_Id'
               value={this.state.Patient_Id}
            //    onChange={this.handleAllChanges.bind(this)
            //    }
            required
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Patient Name' 
               name='Patient_Name'
               onChange={this.handleAllChanges.bind(this)}
               defaultValue={this.state.Patient_Name}
               required
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Address</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Patient Address' 
               name='Patient_Address'
               onChange={this.handleAllChanges.bind(this)}
               value={this.state.Patient_Address}
               required
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient City</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Patient City' 
               name='Patient_City'
               onChange={this.handleAllChanges.bind(this)}
               value={this.state.Patient_City}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Age</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Patient Age' 
                 name='Patient_Age'
                 onChange={this.handleAllChanges.bind(this)}
                 value={this.state.Patient_Age}
                 />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Gender</label>
               <select class="col-sm-9"
               name='Patient_Gender'
                onChange={this.handleAllChanges.bind(this)}
                value={this.state.Patient_Gender}
                >
                 <option value="select">Select</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
               </select>
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Date of Birth</label>
               <input type='date'
                class="col-sm-9"
                 placeholder='Date of Birth'
                 name='Date_of_Birth'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.state.Date_of_Birth}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Disease</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Patient Disease'
                 name='Patient_Disease'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.state.Patient_Disease}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Mobile No</label>
               <input type='text'
                class="col-sm-9"
                placeholder='Mobile No'
                name='Patient_Mobile_No'
                onChange={this.handleAllChanges.bind(this)}
                  value={this.state.Patient_Mobile_No}
                 ></input>
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Type</label>
               <select class="col-sm-9"
               name='Patient_Type'
                 onChange={this.handleAllChanges.bind(this)}
                  value={this.state.Patient_Type}>
                  <option value="Select">Select</option>
                 <option value="In Ward">IN WARD</option>
                 <option value="Out ward">OUT WARD</option>
               </select>
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Patient Ward ID</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Ward Id'
                 name='Patient_Ward_ID'
                 onChange={this.handleAllChanges.bind(this)}
                value={this.state.Patient_Ward_ID}
                 />
               </div><br/>

               <div align='center'>
               <input type="button" value="Submit"  className="btn btn-primary" onClick={this.save.bind(this)} /> <br/>
               </div>
</div>
              
          </form>
      </div>
      </div>
      </>

    );
  }
}

export default Updateproduct;

