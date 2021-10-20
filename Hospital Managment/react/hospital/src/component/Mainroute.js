import React,{Component} from 'react'
import { Link,Switch ,Redirect,Route} from 'react-router-dom'
import HttpCallComponent from './subcomponent/httpsecurecomponent';
import Home from './subcomponent/Homepage'
import "bootstrap/dist/css/bootstrap.css";
class Masterroute extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Switch>
                   
                    <Route exact path='/' component={HttpCallComponent} />
                    <Route exact path='/homepage' component={Home} />
                    {/* <Route exact path='/patient' component={Patient} /> */}
                    {/* <Route exact path='/logout' component={HttpCallComponent}/> */}
                    {/* <Route exact path='/patient' component={Patient} />
                    <Route exact path='/doctor' component={Doctor} />
                    <Route exact path='/nurse' component={Nurse} />
                    <Route exact path='/wardboy' component={wardboy}/>
                    <Route exact path='/medicine' component={Medicine}/>
                    <Route exat path='/roomward' component={Roomward}/>
                    <Route exact path ='/cantine' component={Cantine}/> */}
                </Switch>
            </div>
         );
    }
}
export default Masterroute;
