import React, { Component } from "react";
import Cantinee from "./cantineaxios";
import { Navbar } from "react-bootstrap";
class Updatecantine extends Component {
  constructor(props) {
    super(props);
    this.obj=props.location.state;
    this.state = {
        Food_Id: this.obj['foodid'],
        Food_Name:this.obj['foodname'],
        Food_Quantity:this.obj['foodquantity'],
        Food_type:this.obj['foodtype'],
        Food_price:this.obj['price'],
      departments: [],
      columnHeaders: [],
      message: "",
    }
    this.serv = new Cantinee();
  }
handleAllChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value,evt.target.name);
  };
submit = () => {
  var Food = {
    foodid:this.state.Food_Id,
    foodname: this.state.Food_Name,
    foodquantity: this.state.Food_Quantity,
    foodtype: this.state.Food_type,
    price:this.state.Food_price
  };
  console.log(Food);
  this.serv.putfood(this.state.Food_Id,Food)
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
        <h3 align='center'>Update Cantine Data</h3> 
               <div className='form-group row'>
               <label style={{fontFamily:"-moz-initial" ,fontSize:20}} class="col-sm-2 col-form-label">Food Id</label>
               <input 
               type='text'class="col-sm-9" 
               placeholder='Food_Id'  
               name='Food_Id'
               value={this.state.Food_Id}
               />
               </div><br/>

               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Food Name</label>
               <input type='text' class="col-sm-9" 
               placeholder='Food_Name' 
               name='Food_Name'
               defaultValue={this.state.Food_Name}
               onChange={this.handleAllChanges.bind(this)}
               
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Food Quantity</label>
               <input type='text' 
               class="col-sm-9" 
               placeholder='Food_Quantity' 
               name='Food_Quantity'
               onChange={this.handleAllChanges.bind(this)}
               value={this.state.Food_Quantity}
               />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Food type</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Food_type' 
                 name='Food_type'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.state.Food_type}
                 />
               </div><br/>
               <div className='form-group row'>
               <label class="col-sm-2 col-form-label" style={{fontFamily:"-moz-initial" ,fontSize:20}}>Food price</label>
               <input type='text'
                class="col-sm-9"
                 placeholder='Food_price' 
                 name='Food_price'
                 onChange={this.handleAllChanges.bind(this)}
                 defaultValue={this.state.Food_price}
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
export default Updatecantine;

