import React, { Component } from "react";
import Wardboyaxioss from "./wardboyaxios";
import { Navbar } from "react-bootstrap";
class Addwardboy extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Wardboy_Id: 0,
        Wardboy_Name:"",
        Wardboy_Mobile_No:"",
        Wardboy_Address:"",
        Wardboy_City:"",
        Wardboy_Email:"",
        Wardboy_wardinfo:"",
        departments: [],
        columnHeaders: [],
        message: "",
    }
    this.serv = new Wardboyaxioss();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);

  };
  submit = () => {
  var Wardboy = {
    wbid:this.state.Wardboy_Id,
    wbname: this.state.Wardboy_Name,
    wbmobileno: this.state.Wardboy_Mobile_No,
    wbaddress: this.state.Wardboy_Address ,
    wbcity: this.state. Wardboy_City,
    wbemail: this.state.Wardboy_Email,
    wardinfo: this.state.Wardboy_wardinfo
  };
  console.log(Wardboy);
this.serv.postwardboy(Wardboy)
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
        <h3 align='center'>Register New Ward boy </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label"> Wardboy Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder='Wardboy_Id'  
               name='Wardboy_Id'
               Value={this.state. Wardboy_Id}
               onChange={this.handleAllChanges.bind(this)}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Wardboy Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Wardboy_Name' 
               name='Wardboy_Name'
               onChange={this.handleAllChanges.bind(this)}
               Value={this.state.Wardboy_Name}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Mobile No</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Wardboy_Mobile_No' 
               name='Wardboy_Mobile_No'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Wardboy_Mobile_No}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Wardboy Address</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Wardboy_Address' 
               name='Wardboy_Address'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Wardboy_Address}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Wardboy City</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Wardboy_City' 
                 name='Wardboy_City'
                 onChange={this.handleAllChanges.bind(this)}
                 Value={this.props.Wardboy_City}
                 />
               </div><br/>
              

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Wardboy Email</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Wardboy_Email'
                 name='Wardboy_Email'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Wardboy_Email}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Wardboy wardinfo</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Wardboy_wardinfo'
                 name='Wardboy_wardinfo'
                  onChange={this.handleAllChanges.bind(this)}
                  Value={this.props.Wardboy_wardinfo}
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
export default Addwardboy;

