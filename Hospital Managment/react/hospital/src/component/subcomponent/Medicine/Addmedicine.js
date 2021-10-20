import React, { Component } from "react";
import Medicineaxios from "./Medicineaxios";
import { Navbar } from "react-bootstrap";
class Addmedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Medicine_Id: 0,
      Name:"",
      Medicine_Type:"",
      Expiry_Date:"",
      Manufacture_date: 0,
      In_ward_date:"",
      Price:"",
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Medicineaxios();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);
  };
submit = () => {
  var Medicine = {
    medicineid:this.state.Medicine_Id,
    name: this.state.Name,
    medicinetype: this.state.Medicine_Type,
    manufacturedate: this.state.Manufacture_date,
    expirydate: this.state.Expiry_Date,
    inwarddate: this.state.In_ward_date,
    price: this.state.Price,
  };
  console.log(Medicine);
  this.serv.postmedicineinfo(Medicine)
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
        <h3 align='center'>Register New Medicine  </h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">Medicine Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder=' Medicine_Id'  
               name=' Medicine_Id'
               defaultValue={this.state.Medicine_Id}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Medicine Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Name' 
               name='Name'
               defaultValue={this.state.Name}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Medicine Type</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Medicine_Type' 
               name='Medicine_Type'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Medicine_Type}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Manufacture Date</label>
               <input type='date'
                class="col-sm-9"
                 placeholder='Manufacture_date' 
                 name='Manufacture_date'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.props.Manufacture_date}
                 />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Expiry Date</label>
               <input type='date' 
               class="col-sm-9" 
               placeholder='Expiry_Date' 
               name='Expiry_Date'
               onChange={this.handleAllChanges.bind(this)}
               value={this.props.Expiry_Date}
               />
               </div><br/>

              
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}> In ward date</label>
               <input type='date'
                class="col-sm-9"
                 placeholder='In_ward_date'
                 name='In_ward_date'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.In_ward_date}
                  />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Price</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Price'
                 name='Price'
                  onChange={this.handleAllChanges.bind(this)}
                  value={this.props.Price}
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
export default Addmedicine;

