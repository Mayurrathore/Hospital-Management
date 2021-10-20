import React,{Component} from "react";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            RegUserName: "",
            RegPAssword: "",
            AuthUserName: "",
            AuthPAssword: "",
            message: "",
            departments: [],
            isRegUserNameValid:true,
            isRegPAsswordValid:true,
            isFormValid:true
          };
    }
    clearReg = () => {
        this.setState({ UserId: 0 });
        this.setState({ RegUserName: "" });
        this.setState({ RegPAssword: "" });
      };
      register() {
        let user = {
          UserId: this.state.UserId,
          UserName: this.state.RegUserName,
          PAssword: this.state.RegPAssword,
        };
        this.serv
          .registerUser(user)
          .then((resp) => {
            this.setState({ message: resp.data.message });
          })
          .catch((error) => {
            this.setState({ message: `Error Occured ${error.message}` });
          });
      }
      handleInPutChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        this.validateInputs(evt.target.name,evt.target.value);
      };
      validateInputs=(name,value)=>{
        if(name === 'RegUserName'){
            if(value.length === 0) {
                this.setState({isRegUserNameValid:false});
                this.setState({isFormValid:false});
            }else {
                this.setState({isRegUserNameValid:true});
                this.setState({isFormValid:true});
            }
        }
        if(name === 'RegPAssword'){
            if(value.length === 0) {
                this.setState({isRegPAsswordValid:false});
                this.setState({isFormValid:false});
            }else {
                this.setState({isRegPAsswordValid:true});
                this.setState({isFormValid:true});
            }
        }
    
      }
    render() { 
        return ( 
        <>
                <table className="table table-bordred table-striped">
                  <tbody>
                    <tr>
                      <td>User Id</td>
                      <td>
                        <input
                          type="text"
                          name="UserId"
                          onChange={this.handleInPutChanges.bind(this)}
                          className="form-control"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>User Name</td>
                      <td>
                        <input
                          type="text"
                          name="RegUserName"
                          value={this.state.RegUserName}
                          onChange={this.handleInPutChanges.bind(this)}
                          className="form-control"
                        />
                        <div className="alert alert-danger" hidden={this.state.isRegUserNameValid}>
                            The User Name is Required
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Password</td>
                      <td>
                        <input
                          type="password"
                          className="form-control"
                          name="RegPAssword"
                          value={this.state.RegPAssword}
                          onChange={this.handleInPutChanges.bind(this)}
                        />
                          <div className="alert alert-danger" hidden={this.state.isRegPAsswordValid}>
                            The Password is Required
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="button"
                          value="Clear"
                          onClick={this.clearReg.bind(this)}
                          className="btn btn-primary"
                        />
                      </td>
                      <td>
                        <input
                          type="button"
                          value="Register"
                          onClick={this.register.bind(this)}
                          disabled={!this.state.isFormValid}
                          className="btn btn-success"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
        </> );
    }
}
 
export default Register;