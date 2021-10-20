import React, { Component } from "react";
import Nurseaxiosss from "./Nurseaxios";
import { Navbar } from "react-bootstrap";
class Addnurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Nurse_Id: 0,
        Nurse_Name:"",
        Nurse_Mobile_No:"",
        Nurse_Address:"",
        Nurse_City:"",
        Nurse_Email:"",
        Nurse_wardinfo:"",
        departments: [],
        columnHeaders: [],
        message: "",
    }
    this.serv = new Nurseaxiosss();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);

  };
  submit = () => {
  var Nurse = {
    nid:this.state.Nurse_Id,
    nname: this.state.Nurse_Name,
    nmobileno: this.state.Nurse_Mobile_No,
    naddress: this.state.Nurse_Address ,
    ncity: this.state. Nurse_City,
    nemail: this.state.Nurse_Email,
    wardinfo: this.state.Nurse_wardinfo
  };
  console.log(Nurse);
this.serv.postnurseinfo(Nurse)
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
        <h3 align='center'>Register NewNurse </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label"> Nurse Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder='Nurse_Id'  
               name='Nurse_Id'
               Value={this.state. Nurse_Id}
               onChange={this.handleAllChanges.bind(this)}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Nurse Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Nurse_Name' 
               name='Nurse_Name'
               onChange={this.handleAllChanges.bind(this)}
               Value={this.state.Nurse_Name}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Mobile No</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Nurse_Mobile_No' 
               name='Nurse_Mobile_No'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Nurse_Mobile_No}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Nurse Address</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Nurse_Address' 
               name='Nurse_Address'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Nurse_Address}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Nurse_City</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Nurse_City' 
                 name='Nurse_City'
                 onChange={this.handleAllChanges.bind(this)}
                 Value={this.props.Nurse_City}
                 />
               </div><br/>
              

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Nurse Email</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Nurse_Email'
                 name='Nurse_Email'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Nurse_Email}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Nurse wardinfo</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Nurse_wardinfo'
                 name='Nurse_wardinfo'
                  onChange={this.handleAllChanges.bind(this)}
                  Value={this.props.Nurse_wardinfo}
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
export default Addnurse;

