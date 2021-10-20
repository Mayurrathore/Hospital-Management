import React,{Component} from "react";
import RadioDom from './re1'
import CheckBoxDom from "./re2";
// import './App.css'



class App extends Component {
    cont = [
        'antifungal','antifungals','bifunctional','cofunction','cofunctions','Vapid'
    ]
    render() { 
        return (
          
            <>
                <h1>Radio Buttons</h1>
                <div>
                    <RadioDom name='rbName' val = {this.cont}/>
                </div>
                <h1>CheckBoxes</h1>
                <div>
                <CheckBoxDom name='rbName' val = {this.cont}/>
                </div>
                </>
           
         );
    }
}
 
export default App;