import React, { Component } from "react";
import Loginaxios from "./loginaxios";
import logo from "./image/new.png"
import dd from "./image/hhh.png"
import "../subcomponent/login.css"
class HttpCallComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AuthUserName: "",
      AuthPassword: "",
      message: "",
      departments: [],
      isAuthUserName:true,
      isAuthPassword:true,
      isFormValid:true
    };
    this.serv = new Loginaxios();
  }
auth() {
    let user = {
      UserName: this.state.AuthUserName,
      Password: this.state.AuthPassword,
    };
    this.serv
      .authUser(user)
      .then((resp) => {
        console.log(resp.data)
        this.setState({ message: resp.data.message });
        sessionStorage.setItem("token", resp.data.token.token);
        sessionStorage.setItem("Designation",resp.data.token.desi)
        sessionStorage.setItem("User",resp.data.token.user)
        alert('Login sucessfully')
        this.props.history.push('/homepage');
      })
      .catch((error) => {
        this.setState({ message: `Error Occured Enter a valid Id and  password` });
      });
  }
  handleInPutChanges = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    this.validateInputs(evt.target.name,evt.target.value);
  };

  // validation logic
validateInputs=(name,value)=>{
    if(name === 'AuthUserName'){
        if(value.length === 0) {
            this.setState({isAuthUserName:false});
            this.setState({isFormValid:false});
            alert('Enter valid email')
        }else {
            this.setState({isAuthUserName:true});
            this.setState({isFormValid:true});
        }
    }
    if(name === 'AuthPassword'){
        if(value.length === 0) {
            this.setState({isAuthPassword:false});
            this.setState({isFormValid:false});
        }else {
            this.setState({isAuthPassword:true});
            this.setState({isFormValid:true});
        }
    }

  }

  render() {
    return (
      <div className="container-lg">
<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5"> 
                    <div class="row" > <img src={logo} class="logo"/> </div> 
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={dd} class="image"/> </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card2 card border-0 px-4 py-5">
                <br/><br/><br/>
                    <div class="row mb-4 px-3">
                        <h5 class="mb-0 mr-4 mt-2">Login</h5><br/><br/>
                    </div>
                    <div class="row px-3"> <label class="mb-1"><h6 class="mb-0 text-sm">Email Address</h6></label> 
                    <input class="mb-4" 
                    type="text" 
                    placeholder="Enter a valid email address"
                    name="AuthUserName"
                    Value={this.state.AuthUserName}
                    onChange={this.handleInPutChanges.bind(this)}
                    /> </div>
                    <div class="row px-3"> <label class="mb-1"><h6 class="mb-0 text-sm">Password</h6></label> 
                    <input type="password"
                    placeholder="Enter password"
                    name='AuthPassword'
                   Value={this.state.AuthPassword}
                   onChange={this.handleInPutChanges.bind(this)}/> </div><br/>
                    <div className="container" style={{color:"red" ,fontFamily:'cursive'}}> <strong>{this.state.message}</strong></div><br/>
                    <div class="row mb-3 px-3"> 
                    <input type="button" 
                    class="btn btn-primary text-center"
                    value="Login" 
                    onClick={this.auth.bind(this)}
                    ></input> </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account Connect to Admin Staff</small> </div>
                </div>
            </div>
        </div>
        
    </div>
</div> 
</div>
    );
  }
}

export default HttpCallComponent;