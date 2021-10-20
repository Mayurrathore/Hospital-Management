import React, { Component } from "react";
import Roomwards from "./roomwardaxios";
import { Navbar } from "react-bootstrap";
class Addroomward extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Roomward_Id: 0,
        ward_Type:"",
        Room_Type:"",
        Fees_per_day: 0,
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Roomwards();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);
  };
submit = () => {
  var Roomward = {
    idwr:this.state.Roomward_Id,
    wardtype1: this.state.ward_Type,
    roomtype1: this.state.Room_Type,
    roomfeesperday: this.state.Fees_per_day,
  };
  console.log(Roomward);
  this.serv.postroomward(Roomward)
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
        <h3 align='center'>Register New Ward  </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">Roomward Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder=' Roomward_Id'  
               name=' Roomward_Id'
               defaultValue={this.state.Roomward_Id}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>ward Type</label>
               <input type='text' class="col-sm-9" 
               placeholder='ward_Type' 
               name='ward_Type'
               defaultValue={this.state.ward_Type}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Room Type</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Room_Type' 
               name='Room_Type'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Room_Type}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Fees Per Day</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Fees_per_day' 
                 name='Fees_per_day'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.props.Fees_per_day}
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
export default Addroomward;

